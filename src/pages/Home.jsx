import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import gsap from 'gsap';
import { fetchProducts, fetchCategories } from '../utils/api';
import { useCart } from '../context/CartContext';
import Loader from '../components/Loader';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const productRefs = useRef([]);

  const selectedCategories = searchParams.getAll('category');
  const searchQuery = searchParams.get('search') || '';
  const currentPage = parseInt(searchParams.get('page') || '1');

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [selectedCategories.join(','), searchQuery, currentPage]);

  const loadCategories = async () => {
    const data = await fetchCategories();
    setCategories(Array.isArray(data) ? data.slice(0, 6) : []);
  };

  const loadProducts = async () => {
    setLoading(true);
    const result = await fetchProducts(selectedCategories, currentPage, 10, searchQuery);
    setProducts(Array.isArray(result.products) ? result.products : []);
    setPagination(result.pagination || { page: 1, limit: 10, total: 0 });
    setLoading(false);
  };

  useEffect(() => {
    if (products.length > 0 && productRefs.current.length > 0) {
      gsap.fromTo(
        productRefs.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out'
        }
      );
    }
  }, [products]);

  const handleCategoryToggle = (category) => {
    const params = new URLSearchParams(searchParams);
    const current = params.getAll('category');
    
    if (current.includes(category)) {
      params.delete('category');
      current.filter(c => c !== category).forEach(c => params.append('category', c));
    } else {
      params.append('category', category);
    }
    
    params.set('page', '1');
    setSearchParams(params);
  };

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

  const categoryIcons = {
    electronics: '📱',
    clothing: '👕',
    footwear: '👟',
    appliances: '🏠',
    sports: '⚽',
    accessories: '👜',
    furniture: '🪑',
    default: '📦'
  };

  const totalPages = Math.ceil(pagination.total / pagination.limit);

  return (
    <div className="min-h-screen bg-secondary">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          {/* Main Hero Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl lg:rounded-2xl overflow-hidden shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-center p-4 sm:p-6 lg:p-12">
              {/* Left Content */}
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
              
              {/* Right Image */}
              <div className="flex justify-center mt-4 lg:mt-0">
                <img 
                  src="/header.png" 
                  alt="Shopping" 
                  className="w-full max-w-xs sm:max-w-sm lg:max-w-md h-auto"
                />
              </div>
            </div>
          </div>

          {/* Features Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-6 lg:mt-8">
            <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 text-center sm:text-left">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-gray-900 text-xs sm:text-sm lg:text-base">Free Shipping</div>
                <div className="text-xs text-gray-600 hidden sm:block">Orders $50+</div>
              </div>
            </div>

            <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 text-center sm:text-left">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-gray-900 text-xs sm:text-sm lg:text-base">Secure Pay</div>
                <div className="text-xs text-gray-600 hidden sm:block">100% secure</div>
              </div>
            </div>

            <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 text-center sm:text-left">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-gray-900 text-xs sm:text-sm lg:text-base">Easy Returns</div>
                <div className="text-xs text-gray-600 hidden sm:block">30 days</div>
              </div>
            </div>

            <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 text-center sm:text-left">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-gray-900 text-xs sm:text-sm lg:text-base">24/7 Support</div>
                <div className="text-xs text-gray-600 hidden sm:block">Always here</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        {/* Featured Products */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
          </div>

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
                    className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all cursor-pointer group relative"
                    data-testid="product-card"
                  >
                    <div className="relative overflow-hidden">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="absolute top-3 right-3 z-10 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-colors"
                      >
                        <svg className="w-5 h-5 text-gray-400 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                      
                      <div className="aspect-square bg-gray-50 relative">
                        <img
                          src="/headphone.png"
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        
                        {/* Buy Now Button - Always visible on mobile, slide-up on desktop */}
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
                            <span className="text-yellow-400 text-sm">★</span>
                            <span className="text-xs font-medium text-gray-600">{product.rating.rate}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
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
                    if (
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                            currentPage === pageNum
                              ? 'bg-primary text-white'
                              : 'bg-white text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
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
