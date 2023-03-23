import React from "react";
import "../styles/products.css"

const Products = ({ url, pName, desc, price, handleAddToCart }) => {
  return (
    <div className="product_info-container">
      <img className="product_img" src={url} alt={pName} />
      <div className="product_description">
        <h3>{pName}</h3>
        <p>{desc}</p>
        <p>${price}.00</p>
      <div>
        <button onClick={handleAddToCart}>Add to cart</button>
      </div>
      </div>
    </div>
  );
};

export default Products;
