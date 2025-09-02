import React, { useState } from 'react';

// ProductCard Component - Reusable card with inline styles
const ProductCard = ({ product }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const cardStyles = {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    transform: 'translateY(0)',
  };

  const cardHoverStyles = {
    ...cardStyles,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    transform: 'translateY(-4px)',
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={isHovered ? cardHoverStyles : cardStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div style={{ 
        position: 'relative', 
        height: '192px', 
        backgroundColor: '#f3f4f6', 
        overflow: 'hidden' 
      }}>
        {!imageLoaded && (
          <div style={{
            position: 'absolute',
            inset: '0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#d1d5db',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }}>
            <div style={{ width: '100%', height: '100%', backgroundColor: '#d1d5db' }}></div>
          </div>
        )}
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            opacity: imageLoaded ? '1' : '0',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200/e5e7eb/9ca3af?text=No+Image';
            setImageLoaded(true);
          }}
        />
        {product.badge && (
          <span style={{
            position: 'absolute',
            top: '8px',
            left: '8px',
            backgroundColor: '#ef4444',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '9999px',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            {product.badge}
          </span>
        )}
      </div>

      {/* Product Details */}
      <div style={{ padding: '24px' }}>
        {/* Product Name */}
        <h3 style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#111827',
          marginBottom: '8px',
          lineHeight: '1.25',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {product.name}
        </h3>

        {/* Product Price */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#2563eb' }}>
            ${product.price}
          </span>
          {product.originalPrice && (
            <span style={{ fontSize: '14px', color: '#6b7280', textDecoration: 'line-through' }}>
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Product Description */}
        <p style={{
          color: '#6b7280',
          fontSize: '14px',
          marginBottom: '16px',
          lineHeight: '1.5',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {product.description}
        </p>

        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              style={{
                width: '16px',
                height: '16px',
                color: i < Math.floor(product.rating) ? '#fbbf24' : '#d1d5db'
              }}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span style={{ fontSize: '14px', color: '#6b7280', marginLeft: '4px' }}>
            ({product.rating})
          </span>
        </div>

        {/* Buy Now Button */}
        <button
          style={{
            width: '100%',
            backgroundColor: '#2563eb',
            color: 'white',
            fontWeight: '600',
            padding: '12px 16px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease',
            fontSize: '16px'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  // Sample product data
  const products = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 79.99,
      originalPrice: 99.99,
      description: "Premium quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop",
      rating: 4.5,
      badge: "Sale"
    },
    {
      id: 2,
      name: "Smart Watch Series 5",
      price: 299.99,
      description: "Advanced fitness tracking, heart rate monitoring, GPS, and smartphone integration. Water-resistant design for active lifestyles.",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop",
      rating: 4.8
    },
    {
      id: 3,
      name: "Portable Power Bank",
      price: 24.99,
      originalPrice: 34.99,
      description: "10,000mAh capacity with fast charging support. Compact design with LED indicator and multiple charging ports.",
      image: "https://img.favpng.com/6/23/2/ac-adapter-power-bank-electric-battery-ampere-hour-rechargeable-battery-png-favpng-x5NWTnxVanFRxCSzunX7rb7XA.jpg",
      rating: 4.2,
      badge: "New"
    },
    {
      id: 4,
      name: "Gaming Mechanical Keyboard",
      price: 129.99,
      description: "RGB backlit mechanical keyboard with premium switches. Programmable keys and anti-ghosting technology for gamers.",
      image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=200&fit=crop",
      rating: 4.6
    },
    {
      id: 5,
      name: "Dslr Camera",
      price: 89.99,
      description: "This is a high quality camera with 20MP lens and 4K video recording capability.",
      image: "https://cdn.pixabay.com/photo/2014/08/29/14/53/camera-431119_1280.jpg",
      rating: 4.3
    },
    {
      id: 6,
      name: "Air Pod",
      price: 39.99,
      originalPrice: 49.99,
      description: "These wireless earbuds offer high-fidelity sound and seamless connectivity with all your devices.",
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300&h=200&fit=crop",
      rating: 4.4,
      badge: "Popular"
    }
  ];

  const appStyles = {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #f9fafb, #f3f4f6)',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const headerStyles = {
    backgroundColor: 'white',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    marginBottom: '32px'
  };

  const headerContentStyles = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '24px 16px'
  };

  const mainStyles = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 16px 32px'
  };

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '24px',
    '@media (min-width: 768px)': {
      gridTemplateColumns: 'repeat(2, 1fr)'
    },
    '@media (min-width: 1024px)': {
      gridTemplateColumns: 'repeat(3, 1fr)'
    }
  };

  const footerStyles = {
    backgroundColor: 'white',
    borderTop: '1px solid #e5e7eb',
    marginTop: '64px',
    padding: '32px 16px',
    textAlign: 'center'
  };

  return (
    <div style={appStyles}>
      <style>
        {`
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: .5;
            }
          }
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            line-height: 1.5;
            color: #374151;
          }
          
          @media (max-width: 768px) {
            .grid {
              grid-template-columns: 1fr !important;
            }
          }
          
          @media (min-width: 768px) and (max-width: 1023px) {
            .grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
          
          @media (min-width: 1024px) {
            .grid {
              grid-template-columns: repeat(3, 1fr) !important;
            }
          }
        `}
      </style>

      {/* Header */}
      <header style={headerStyles}>
        <div style={headerContentStyles}>
          <h1 style={{ fontSize: '30px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
            Tech Store
          </h1>
          <p style={{ color: '#6b7280' }}>
            Discover the latest technology products
          </p>
        </div>
      </header>

      {/* Product Grid */}
      <main style={mainStyles}>
        <div className="grid" style={gridStyles}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer style={footerStyles}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <p style={{ color: '#6b7280' }}>
            Built with React + Custom CSS for Hackathon
          </p>
          <p style={{ color: '#6b7280' }}>
            By Code Storm 👨‍💻⚡
            </p>
        </div>
      </footer>
    </div>
  );
};

export default App;