import React from "react";

const Cart = ({ cart, updateQuantity, totalPrice }) => {
  const giftThreshold = 1000;
  const progress = Math.min((totalPrice / giftThreshold) * 100, 100);

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
          {totalPrice >= giftThreshold && <p className="gift-message">🎁 You have unlocked a free gift!</p>}
          
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <span>{item.name} - ${item.price}</span>
              <input
                type="number"
                value={item.quantity}
                min="0"
                onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
              />
            </div>
          ))}
          <p>Total: ${totalPrice}</p>
        </>
      )}
    </div>
  );
};

export default Cart;
