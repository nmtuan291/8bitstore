# 🎮 8BitStore - Gaming E-commerce Platform

A modern, responsive gaming e-commerce platform built with React and TypeScript. 8BitStore offers a comprehensive shopping experience for gaming enthusiasts, featuring consoles, games, accessories, and digital products.

## ✨ Features

### E-commerce Core
- **Product Catalog**: Browse gaming consoles, games, and accessories
- **Shopping Cart**: Add, remove, and manage items
- **Wishlist**: Save favorite products for later
- **Order Management**: Track orders and purchase history
- **Payment Processing**: Multiple payment methods support
- **User Profiles**: Account management and order history

### Gaming-Focused
- **Multi-Platform Support**: PlayStation, Xbox, Nintendo Switch, PC Digital
- **Product Categories**: Consoles, Game Discs, Accessories, Controllers, Headsets
- **Product Reviews**: Customer ratings and reviews
- **Featured Products**: Bestsellers and new arrivals
- **Gaming News**: Latest updates and promotions

### Admin Features
- **Product Management**: Add, edit, and manage inventory
- **Order Management**: Process and track customer orders

### User Experience
- **Responsive Design**: Mobile-first approach
- **Modern UI**: Clean, gaming-themed interface
- **Vietnamese Localization**: Full Vietnamese language support
- **Fast Performance**: Optimized loading and interactions

## Tech Stack
- **React 18**
- **TypeScript**
- **Vite**
- **React Router** 
- **Redux Toolkit**
- **Sass**

### Deployment
- **Vercel**

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nmtuan291/8bitstore.git
   cd 8bitstore
   ```

2. **Navigate to frontend directory**
   ```bash
   cd 8bitstore-fe
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.


## Project Structure

```
8bitstore-fe/
├── public/                 # Static assets
├── src/
│   ├── apis/              # API service functions
│   ├── assets/            # Images, icons, and static files
│   ├── components/        # Reusable UI components
│   │   ├── Header/        # Navigation and header
│   │   ├── Footer/        # Footer component
│   │   └── ProductCard/   # Product display cards
│   ├── contexts/          # React contexts
│   ├── data/              # Static data and configurations
│   ├── hooks/             # Custom React hooks
│   ├── interfaces/        # TypeScript type definitions
│   ├── layout/            # Layout components
│   ├── pages/             # Page components
│   │   ├── Home/          # Homepage with featured products
│   │   ├── Product/       # Product listing and search
│   │   ├── ProductDetail/ # Individual product pages
│   │   ├── Cart/          # Shopping cart
│   │   ├── Wishlist/      # User wishlist
│   │   ├── Profile/       # User account management
│   │   ├── Admin/         # Admin panel
│   │   └── Payment/       # Payment processing
│   ├── store/             # Redux store configuration
│   ├── styles/            # Global styles and themes
│   └── utils/             # Utility functions
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite configuration
├── vercel.json            # Vercel deployment config
└── README.md              # This file
```

## Key Features Overview

### Homepage
- Hero carousel with featured promotions
- Console store sections (PlayStation, Xbox, Nintendo, PC)
- Featured products and bestsellers
- New arrivals and special offers

### Shopping Experience
- Advanced product filtering and search
- Detailed product pages with images and specifications
- Cart management with quantity updates
- Wishlist functionality
- Secure checkout process

### User Management
- User registration and authentication
- Profile management and order history
- Address book management
- Password change functionality

### Admin Panel
- Product inventory management
- Order processing and tracking
- Customer management
- Sales analytics