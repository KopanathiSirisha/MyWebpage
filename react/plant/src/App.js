// App.js
import React, { useState } from 'react';
import './App.css';

const App = () => {
  // Sample plant data
  const [plants, setPlants] = useState([
    {
      id: 1,
      name: "Monstera Deliciosa",
      price: 24.99,
      image: "🌿",
      description: "Beautiful Swiss Cheese Plant with large leaves",
      inStock: true
    },
    {
      id: 2,
      name: "Snake Plant",
      price: 19.99,
      image: "🌱",
      description: "Low maintenance air purifying plant",
      inStock: true
    },
    {
      id: 3,
      name: "Fiddle Leaf Fig",
      price: 34.99,
      image: "🪴",
      description: "Popular indoor tree with large violin-shaped leaves",
      inStock: false
    },
    {
      id: 4,
      name: "Peace Lily",
      price: 22.99,
      image: "🌸",
      description: "Elegant flowering plant that thrives in shade",
      inStock: true
    },
    {
      id: 5,
      name: "Aloe Vera",
      price: 15.99,
      image: "🌵",
      description: "Healing succulent that's easy to care for",
      inStock: true
    },
    {
      id: 6,
      name: "Pothos",
      price: 18.99,
      image: "🍃",
      description: "Trailing vine plant perfect for hanging baskets",
      inStock: true
    }
  ]);

  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const addToCart = (plant) => {
    const existingItem = cart.find(item => item.id === plant.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === plant.id 
          ? {...item, quantity: item.quantity + 1} 
          : item
      ));
    } else {
      setCart([...cart, {...plant, quantity: 1}]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity === 0) {
      removeFromCart(id);
    } else {
      setCart(cart.map(item => 
        item.id === id ? {...item, quantity} : item
      ));
    }
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleCheckout = () => {
    setShowPayment(true);
  };

  const handlePayment = () => {
    alert("Payment successful! Your plants will be delivered soon.");
    setCart([]);
    setShowPayment(false);
    setShowCart(false);
  };

  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <h1 className="logo">Online Store</h1>
          <nav className="nav">
          </nav>
          <button 
            className="cart-btn" 
            onClick={() => setShowCart(!showCart)}
          >
            Cart ({cart.length})
          </button>
        </div>
      </header>

      <main className="main">
        <section className="hero">
          <div className="container">
            <h2>Bring Nature Indoors</h2>
            <p>Discover the perfect plants to transform your living space</p>
            <button className="cta-btn">Plant Now</button>
          </div>
        </section>

        <section className="products">
          <div className="container">
            <h2>Plants</h2>
            <div className="product-grid">
              {plants.map(plant => (
                <div key={plant.id} className="product-card">
                  <div className="product-image">{plant.image}</div>
                  <h3>{plant.name}</h3>
                  <p>{plant.description}</p>
                  <div className="product-footer">
                    <span className="price">${plant.price}</span>
                    <button 
                      className="add-to-cart-btn"
                      onClick={() => addToCart(plant)}
                      disabled={!plant.inStock}
                    >
                      {plant.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {showCart && (
        <div className="cart-modal">
          <div className="cart-content">
            <div className="cart-header">
              <h2>Your Cart</h2>
              <button onClick={() => setShowCart(false)}>×</button>
            </div>
            {cart.length === 0 ? (
              <p className="empty-cart">Your cart is empty</p>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <div className="item-info">
                        <span className="item-image">{item.image}</span>
                        <div>
                          <h4>{item.name}</h4>
                          <p>${item.price}</p>
                        </div>
                      </div>
                      <div className="quantity-controls">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                      <button 
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                <div className="cart-total">
                  <h3>Total: ${getTotal()}</h3>
                  <button className="checkout-btn" onClick={handleCheckout}>
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {showPayment && (
        <div className="payment-modal">
          <div className="payment-content">
            <h2>Payment Details</h2>
            <form className="payment-form">
              <div className="form-group">
                <label>Card Number</label>
                <input type="text" placeholder="1234 5678 9012 3456" required />
              </div>
              <div className="form-group">
                <label>Card Holder</label>
                <input type="text" placeholder="John Doe"required  />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input type="text" placeholder="MM/YY" required />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input type="text" placeholder="123" required  />
                </div>
              </div>
              <div className="payment-buttons">
                <button type="button" onClick={() => setShowPayment(false)}>
                  Cancel
                </button>
                <button type="button" onClick={handlePayment}>
                  Pay ${getTotal()}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Online Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;