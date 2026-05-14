import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShoppingBag, 
  faTimes, 
  faMinus, 
  faPlus,
  faShieldAlt
} from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: ''
  });

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    alert('Order placed successfully! 🎉');
    clearCart();
    setShowCheckoutModal(false);
    navigate('/');
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="mb-6">
            <FontAwesomeIcon icon={faShoppingBag} className="mx-auto h-24 w-24 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Start shopping to add items to your cart</p>
          <button
            onClick={() => navigate('/')}
            className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate('/')}
        className="mb-6 text-primary hover:text-blue-700 font-medium flex items-center space-x-2"
      >
        <span>←</span>
        <span>Back to Home</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h1>
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm p-4 flex gap-4">
                <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src="/headphone.png"
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                  <p className="text-lg font-bold text-primary">${item.price}</p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
                  </button>
                  <div className="flex items-center space-x-3 bg-gray-100 rounded-lg px-3 py-1">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-600 hover:text-gray-900 font-bold"
                    >
                      <FontAwesomeIcon icon={faMinus} className="w-3 h-3" />
                    </button>
                    <span className="font-semibold w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="text-gray-600 hover:text-gray-900 font-bold"
                    >
                      <FontAwesomeIcon icon={faPlus} className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Items ({totalItems})</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary">${totalAmount.toFixed(2)}</span>
              </div>
            </div>
            <button 
              onClick={() => setShowCheckoutModal(true)}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-3"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-xl">
            {/* Modal Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Checkout</h2>
                <p className="text-gray-500 text-sm mt-1">Complete your purchase</p>
              </div>
              <button
                onClick={() => setShowCheckoutModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
              <form onSubmit={handleCheckout} className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column - Forms */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Contact Information */}
                    <div className="border border-gray-200 rounded-lg p-5">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none"
                            placeholder="john@example.com"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none"
                            placeholder="+1 (555) 000-0000"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="border border-gray-200 rounded-lg p-5">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Street Address
                          </label>
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none"
                            placeholder="123 Main Street, Apt 4B"
                          />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                              City
                            </label>
                            <input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                              required
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none"
                              placeholder="New York"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                              State
                            </label>
                            <input
                              type="text"
                              name="state"
                              value={formData.state}
                              onChange={handleInputChange}
                              required
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none"
                              placeholder="NY"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                              ZIP Code
                            </label>
                            <input
                              type="text"
                              name="zipCode"
                              value={formData.zipCode}
                              onChange={handleInputChange}
                              required
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none"
                              placeholder="10001"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Information */}
                    <div className="border border-gray-200 rounded-lg p-5">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Card Number
                          </label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            required
                            maxLength="19"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none"
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              name="cardExpiry"
                              value={formData.cardExpiry}
                              onChange={handleInputChange}
                              required
                              placeholder="MM/YY"
                              maxLength="5"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                              CVV
                            </label>
                            <input
                              type="text"
                              name="cardCVV"
                              value={formData.cardCVV}
                              onChange={handleInputChange}
                              required
                              maxLength="3"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-900 focus:border-gray-900 outline-none"
                              placeholder="123"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Order Summary */}
                  <div className="lg:col-span-1">
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white sticky top-0">
                      <h3 className="text-xl font-bold mb-6">Order Summary</h3>
                      
                      {/* Cart Items Preview */}
                      <div className="space-y-3 mb-6 max-h-48 overflow-y-auto">
                        {cartItems.slice(0, 3).map(item => (
                          <div key={item.id} className="flex gap-3 bg-white bg-opacity-10 rounded-lg p-3">
                            <img 
                              src="/headphone.png" 
                              alt={item.title}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{item.title}</p>
                              <p className="text-xs text-gray-300">Qty: {item.quantity}</p>
                            </div>
                            <p className="text-sm font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        ))}
                        {cartItems.length > 3 && (
                          <p className="text-xs text-gray-400 text-center">+{cartItems.length - 3} more items</p>
                        )}
                      </div>

                      {/* Price Breakdown */}
                      <div className="space-y-3 border-t border-gray-700 pt-4 mb-6">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">Subtotal ({totalItems} items)</span>
                          <span className="font-semibold">${totalAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">Shipping</span>
                          <span className="text-green-400 font-semibold">Free</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">Tax</span>
                          <span className="font-semibold">${(totalAmount * 0.08).toFixed(2)}</span>
                        </div>
                        <div className="border-t border-gray-700 pt-3 flex justify-between text-lg">
                          <span className="font-bold">Total</span>
                          <span className="font-bold text-2xl">${(totalAmount * 1.08).toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Security Badge */}
                      <div className="bg-white bg-opacity-10 rounded-lg p-3 mb-6">
                        <div className="flex items-center gap-2 text-xs">
                          <FontAwesomeIcon icon={faShieldAlt} className="w-4 h-4 text-green-400" />
                          <span className="text-gray-300">Secure SSL encrypted payment</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-3">
                        <button
                          type="submit"
                          className="w-full bg-white text-gray-900 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          Place Order
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowCheckoutModal(false)}
                          className="w-full bg-transparent border-2 border-white border-opacity-30 text-white py-3 rounded-xl font-semibold hover:bg-white hover:bg-opacity-10 transition-all"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
