# E-Commerce Web Application

A modern, responsive e-commerce web application built with React, featuring product browsing, cart management, and a complete checkout flow.

## 🔗 Repository

**GitHub**: [https://github.com/Harshit-Github16/e-commerce](https://github.com/Harshit-Github16/e-commerce)

## 🚀 Live Demo

[Add your deployed link here after deployment]

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Assumptions & Limitations](#assumptions--limitations)
- [Additional Features](#additional-features)
- [Browser Support](#browser-support)

## ✨ Features

### Core Features
- **Product Listing**: Browse products with pagination support
- **Product Details**: View detailed information about each product
- **Shopping Cart**: Add/remove items, update quantities
- **Checkout Process**: Complete checkout form with validation
- **Search Functionality**: Search products by name
- **Responsive Design**: Fully responsive across mobile, tablet, and desktop

### User Experience
- Smooth animations using GSAP
- Loading states for better UX
- Mobile-friendly navigation with hamburger menu
- Hover effects and transitions
- Real-time cart updates

## 🛠 Tech Stack

- **Frontend Framework**: React 19.2.6
- **Routing**: React Router DOM 7.15.0
- **Styling**: Tailwind CSS 3.4.1
- **Animations**: GSAP 3.15.0
- **State Management**: React Context API
- **HTTP Client**: Fetch API
- **Package Manager**: pnpm 11.1.1
- **Build Tool**: React Scripts 5.0.1

## 📦 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js**: v16.x or higher
- **pnpm**: v8.x or higher

To check if you have Node.js installed:
```bash
node --version
```

To install pnpm globally:
```bash
npm install -g pnpm
```

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Harshit-Github16/e-commerce.git
cd e-commerce
```

### 2. Install Dependencies

Using pnpm (recommended):
```bash
pnpm install
```

This will install all required dependencies including:
- React and React DOM
- React Router
- Tailwind CSS
- GSAP
- And other necessary packages

### 3. Environment Setup

No environment variables are required for basic functionality. The app uses the Fake Store API (https://fakestoreapi.com) by default.

## 🚀 Running the Application

### Development Mode

Start the development server:

```bash
pnpm start
```

The application will open automatically at [http://localhost:3000](http://localhost:3000)

- The page will reload automatically when you make changes
- You will see lint errors in the console

### Production Build

Create an optimized production build:

```bash
pnpm build
```

The build files will be generated in the `build/` directory and are ready for deployment.

### Preview Production Build

After building, you can preview the production build locally:

```bash
npx serve -s build
```

## 📁 Project Structure

```
ecommerce-app/
├── public/
│   ├── header.png          # Hero section image
│   ├── headphone.png       # Product placeholder image
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.jsx      # Navigation header with cart
│   │   ├── Footer.jsx      # Footer component
│   │   └── Loader.jsx      # Loading spinner
│   ├── context/
│   │   └── CartContext.jsx # Cart state management
│   ├── pages/
│   │   ├── Home.jsx        # Product listing page
│   │   ├── ProductDetail.jsx # Product details page
│   │   └── Cart.jsx        # Shopping cart & checkout
│   ├── utils/
│   │   └── api.js          # API integration functions
│   ├── App.jsx             # Main app component
│   ├── index.tsx           # Entry point
│   └── index.css           # Global styles
├── .npmrc                  # pnpm configuration
├── package.json
├── pnpm-lock.yaml
├── tailwind.config.js
└── README.md
```

## 🔌 API Integration

The application integrates with the [Fake Store API](https://fakestoreapi.com):

### Endpoints Used:
- `GET /products` - Fetch all products with pagination
- `GET /products/:id` - Fetch single product details
- `GET /products/categories` - Fetch product categories

### API Functions (`src/utils/api.js`):
- `fetchProducts(categories, page, limit, search)` - Get paginated products
- `fetchProductById(id)` - Get product by ID
- `fetchCategories()` - Get all categories

## 📝 Assumptions & Limitations

### Assumptions:
1. **Payment Processing**: Checkout form is for demonstration only; no actual payment processing
2. **User Authentication**: No login/signup functionality implemented
3. **Product Images**: Using placeholder images as API images may not load consistently
4. **Inventory Management**: Stock levels are simulated, not real-time
5. **Order History**: Orders are not persisted; cart clears after checkout

### Limitations:
1. **Cart Persistence**: Cart data is stored in memory (Context API) and clears on page refresh
2. **Search**: Client-side search only; filters products already loaded
3. **Categories**: Category filtering uses API categories but may be limited
4. **Mobile Optimization**: Optimized for modern browsers; may have issues on very old devices
5. **Offline Support**: No offline functionality; requires internet connection

### Known Issues:
- API rate limiting may occur with frequent requests
- Product images from API may occasionally fail to load
- Pagination resets when applying search filters

## 🎯 Additional Features Implemented

Beyond the basic requirements, the following features were added:

1. **Enhanced UI/UX**:
   - Smooth page transitions with GSAP animations
   - Hover effects on product cards
   - Mobile-responsive hamburger menu
   - Loading states for better feedback

2. **Cart Features**:
   - Real-time cart count badge
   - Cart total calculation with tax
   - Quantity increment/decrement
   - Remove items functionality

3. **Checkout Enhancements**:
   - Form validation
   - Order summary with item preview
   - Responsive modal design
   - Security badge display

4. **Search & Filter**:
   - Real-time product search
   - Pagination with page numbers

5. **Responsive Design**:
   - Mobile-first approach
   - Tablet and desktop optimizations
   - Touch-friendly buttons and controls

6. **Performance**:
   - Optimized re-renders with React hooks
   - Efficient state management

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 is already in use:
```bash
PORT=3001 pnpm start
```

### Dependencies Installation Issues
Clear cache and reinstall:
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Build Errors
Ensure you're using Node.js v16 or higher:
```bash
node --version
```

### pnpm Not Found
Install pnpm globally:
```bash
npm install -g pnpm
```

## 📜 Available Scripts

In the project directory, you can run:

### `pnpm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `pnpm build`
Builds the app for production to the `build` folder

### `pnpm test`
Launches the test runner in interactive watch mode

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Development Notes

- Code follows React best practices and hooks guidelines
- ESLint warnings have been addressed
- Components are modular and reusable
- Responsive design uses Tailwind CSS utility classes
- State management uses Context API for simplicity
- Package manager: pnpm for faster, more efficient dependency management

## 🤝 Contributing

This is a demonstration project. For any issues or suggestions, please create an issue in the repository.

---

**Note**: This application was built as part of a technical assessment. All core functionality has been implemented with attention to code quality, user experience, and responsive design. The project uses pnpm as the package manager for better performance and disk space efficiency.
