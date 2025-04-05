import React, { useState } from "react";
import "./App.css";

const products = [
  { id: 1, name: "Laptop", price: 500 },
  { id: 2, name: "Smartphone", price: 300 },
  { id: 3, name: "Headphones", price: 100 },
  { id: 4, name: "Smartwatch", price: 150 },
];

const FREE_GIFT_THRESHOLD = 1000;

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, amount) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + amount } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const progress = (subtotal / FREE_GIFT_THRESHOLD) * 100;

  return (
    <div className="container">
      <h1 className="title">Shopping Cart</h1>
      <div className="products">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p className="price">₹{product.price}</p>
            <button className="add-btn" onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h2>Cart Summary</h2>
        <p className="subtotal">Subtotal: ₹{subtotal}</p>
        {subtotal > 0 && subtotal < FREE_GIFT_THRESHOLD ? (
          <p className="gift-message">Add ₹{FREE_GIFT_THRESHOLD - subtotal} more to get a FREE Wireless Mouse!</p>
        ) : subtotal >= FREE_GIFT_THRESHOLD ? (
          <p className="gift-message success">You got a free Wireless Mouse!</p>
        ) : (
          <p className="empty-cart">Your cart is empty</p>
        )}
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      <div className="cart-items">
        {cart.length > 0 ? (
          cart.map((item) => (
            <div key={item.id} className="cart-item">
              <span className="item-details">{item.name} ₹{item.price} x {item.quantity}</span>
              <div className="quantity-controls">
                <button className="quantity-btn" onClick={() => updateQuantity(item.id, -1)}>-</button>
                <button className="quantity-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
              </div>
              <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))
        ) : (
          <p className="empty-cart">Add some products to see them here!</p>
        )}
      </div>
    </div>
  );
}

export default App;
