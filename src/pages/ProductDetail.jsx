import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import gsap from 'gsap';
import { fetchProductById } from '../utils/api';
import { useCart } from '../context/CartContext';
import Loader from '../components/Loader';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const containerRef = useRef(null);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      const data = await fetchProductById(id);
      setProduct(data);
      setLoading(false);
    };
    loadProduct();
  }, [id]);

  useEffect(() => {
    if (product && containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, [product]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/')}
          className="mb-4 text-primary hover:text-orange-600 font-medium"
        >
          ← Back to Products
        </button>
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">Product not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate('/')}
        className="mb-6 text-primary hover:text-orange-600 font-medium flex items-center space-x-2"
      >
        <span>←</span>
        <span>Back to Products</span>
      </button>

      <div ref={containerRef} className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img
              src="/headphone.png"
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col">
            <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
              {product.category}
            </p>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>

            {product.rating && (
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center space-x-1">
                  <FontAwesomeIcon icon={faStar} className="text-yellow-400 w-5 h-5" />
                  <span className="font-semibold">{product.rating.rate}</span>
                </div>
                <span className="text-gray-500">({product.rating.count} reviews)</span>
              </div>
            )}

            <div className="text-4xl font-bold text-primary mb-6">
              ${product.price}
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">
              {product.description}
            </p>

            {product.brand && (
              <div className="mb-4">
                <span className="text-gray-600">Brand: </span>
                <span className="font-semibold">{product.brand}</span>
              </div>
            )}

            {product.stock !== undefined && (
              <div className="mb-6">
                <span className="text-gray-600">Availability: </span>
                <span className={`font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </span>
              </div>
            )}

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`w-full py-4 rounded-lg font-semibold text-lg transition-colors ${
                product.stock === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-orange-600'
              }`}
            >
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
