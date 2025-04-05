import React, { useState } from "react";

const products = [
  { id: 1, name: "Laptop", price: 800 },
  { id: 2, name: "Phone", price: 600 },
  { id: 3, name: "Headphones", price: 200 },
];

const ProductList = ({ addToCart }) => {
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (id, amount) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + amount),
    }));
  };

  return (
    <div className="product-list">
      <h2>Products</h2>
      {products.map((product) => (
        <div key={product.id} className="product">
          <span>{product.name} - ${product.price}</span>
          <div className="quantity-controls">
            <button onClick={() => handleQuantityChange(product.id, -1)}>-</button>
            <span>{quantities[product.id] || 1}</span>
            <button onClick={() => handleQuantityChange(product.id, 1)}>+</button>
          </div>
          <button onClick={() => addToCart({ ...product, quantity: quantities[product.id] || 1 })}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
