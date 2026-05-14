import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBars, 
  faShoppingBag, 
  faSearch, 
  faUser, 
  faPhone, 
  faEnvelope,
  faGift
} from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { cartItems } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar - Hidden on mobile */}
      <div className="bg-gray-900 text-white hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-10 text-xs">
            <div className="flex items-center gap-4">
              <span><FontAwesomeIcon icon={faPhone} className="mr-1 w-3 h-3" /> +91-9876598767</span>
              <span><FontAwesomeIcon icon={faEnvelope} className="mr-1 w-3 h-3" /> support@shopnova.com</span>
            </div>
            <div className="flex items-center gap-4">
              <span><FontAwesomeIcon icon={faGift} className="mr-1 w-3 h-3" /> Free Shipping on Orders Over $50!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 md:h-16 gap-3 md:gap-6">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700 p-2"
            >
              <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
              <div className="w-7 h-7 md:w-8 md:h-8 bg-blue-600 rounded flex items-center justify-center">
                <FontAwesomeIcon icon={faShoppingBag} className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <span className="text-lg md:text-xl font-bold text-gray-900">
                Shop<span className="text-blue-600">Nova</span>
              </span>
            </Link>

            {/* Search Bar - Desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button 
                  type="submit" 
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 transition-colors"
                >
                  <FontAwesomeIcon icon={faSearch} className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Right Side */}
            <div className="flex items-center gap-3 md:gap-6">
              {/* Search Icon - Mobile */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-gray-700"
              >
                <FontAwesomeIcon icon={faSearch} className="w-6 h-6" />
              </button>

              {/* Account - Desktop */}
              <Link to="/" className="hidden lg:flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors">
                <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
                <span className="text-sm font-medium">Account</span>
              </Link>

              {/* Cart */}
              <Link to="/cart" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors" data-testid="cart-icon">
                <div className="relative">
                  <FontAwesomeIcon icon={faShoppingBag} className="w-6 h-6" />
                  {totalItems > 0 && (
                    <span 
                      className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                      data-testid="cart-count"
                    >
                      {totalItems}
                    </span>
                  )}
                </div>
                <div className="hidden md:block">
                  <div className="text-xs text-gray-500">Cart</div>
                  <div className="text-sm font-semibold">${totalAmount.toFixed(2)}</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-3">
            {/* Mobile Search */}
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  type="submit" 
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-3 py-1.5 rounded-md"
                >
                  <FontAwesomeIcon icon={faSearch} className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Mobile Navigation */}
            <nav className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-blue-600 py-2 font-medium">
                All Products
              </Link>
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-blue-600 py-2 font-medium">
                Today's Deals
              </Link>
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-blue-600 py-2 font-medium">
                Electronics
              </Link>
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-blue-600 py-2 font-medium">
                Fashion
              </Link>
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-blue-600 py-2 font-medium">
                Home & Kitchen
              </Link>
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 hover:text-blue-600 py-2 font-medium flex items-center gap-2">
                <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded">SALE</span>
                Special Offers
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
