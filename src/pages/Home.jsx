import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTruck, 
  faShieldAlt, 
  faUndo, 
  faHeadset,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import gsap from 'gsap';
import { fetchProducts } from '../utils/api';
import { useCart } from '../context/CartContext';
import Loader from '../components/Loader';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const productRefs = useRef([]);

  const searchQuery = searchParams.get('search') || '';
  const currentPage = parseInt(searchParams.get('page') || '1');

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const result = await fetchProducts([], currentPage, 10, searchQuery);
      setProducts(Array.isArray(result.products) ? result.products : []);
      setPagination(result.pagination || { page: 1, limit: 10, total: 0 });
      setLoading(false);
    };
    loadProducts();
  }, [currentPage, searchQuery]);

  useEffect(() => {
    if (products.length > 0 && productRefs.current.length > 0) {
      gsap.fromTo(
        productRefs.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
      );
    }
  }, [products]);

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    setSearchParams(params);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleBuyNow = (e, product) => {
    e.stopPropagation();
    addToCart(product);
    navigate('/cart');
  };

  const totalPages = Math.ceil(pagination.total / pagination.limit);

  return (
    <div className="min-h-screen bg-secondary">
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl lg:rounded-2xl overflow-hidden shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-center p-4 sm:p-6 lg:p-12">
              <div className="text-white space-y-3 sm:space-y-4 lg:space-y-6">
                <div className="inline-block bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                  SUMMER SALE - UP TO 70% OFF
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                  Grab the Best Deals on Top Brands
                </h1>
                <p className="text-blue-100 text-sm sm:text-base lg:text-lg">
                  Shop the latest collection with amazing discounts. Limited time offer!
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button 
                    onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
                    className="bg-white text-blue-600 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all text-sm sm:text-base"
                  >
                    Shop Now
                  </button>
                  <button 
                    onClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
                    className="border-2 border-white text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all text-sm sm:text-base"
                  >
                    View Deals
                  </button>
                </div>
              </div>
              
              <div className="flex justify-center mt-4 lg:mt-0">
                <img 
                  src="/header.png" 
                  alt="Shopping" 
                  className="w-full max-w-xs sm:max-w-sm lg:max-w-md h-auto"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-6 lg:mt-8">
            {[
              { icon: faTruck, title: 'Free Shipping', desc: 'Orders $50+', color: 'blue' },
              { icon: faShieldAlt, title: 'Secure Pay', desc: '100% secure', color: 'green' },
              { icon: faUndo, title: 'Easy Returns', desc: '30 days', color: 'purple' },
              { icon: faHeadset, title: '24/7 Support', desc: 'Always here', color: 'orange' }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 text-center sm:text-left">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-${feature.color}-100 rounded-full flex items-center justify-center flex-shrink-0`}>
                  <FontAwesomeIcon icon={feature.icon} className={`w-5 h-5 sm:w-6 sm:h-6 text-${feature.color}-600`} />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-gray-900 text-xs sm:text-sm lg:text-base">{feature.title}</div>
                  <div className="text-xs text-gray-600 hidden sm:block">{feature.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Products</h2>

          {loading ? (
            <Loader />
          ) : products.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl">
              <p className="text-gray-500">No products found</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {products.map((product, index) => (
                  <div
                    key={product.id}
                    ref={el => productRefs.current[index] = el}
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
                    data-testid="product-card"
                  >
                    <div className="relative overflow-hidden">
                      <div className="aspect-square bg-gray-50 relative">
                        <img
                          src="/headphone.png"
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        
                        <div className="absolute bottom-0 left-0 right-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-300">
                          <button
                            onClick={(e) => handleBuyNow(e, product)}
                            className="w-full bg-primary text-white py-3 font-semibold hover:bg-blue-700 transition-colors"
                          >
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1 text-sm">
                        {product.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-900">
                          ${product.price}
                        </span>
                        {product.rating && (
                          <div className="flex items-center gap-1">
                            <FontAwesomeIcon icon={faStar} className="text-yellow-400 w-3.5 h-3.5" />
                            <span className="text-xs font-medium text-gray-600">{product.rating.rate}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-10">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg bg-white text-gray-700 font-medium hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ← Previous
                  </button>
                  
                  {[...Array(totalPages)].map((_, i) => {
                    const pageNum = i + 1;
                    const showPage = pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1);
                    const showDots = pageNum === currentPage - 2 || pageNum === currentPage + 2;
                    
                    if (showPage) {
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                            currentPage === pageNum ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    }
                    if (showDots) {
                      return <span key={pageNum} className="text-gray-400">...</span>;
                    }
                    return null;
                  })}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg bg-white text-gray-700 font-medium hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
