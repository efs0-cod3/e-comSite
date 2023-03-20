import React, { useEffect, useState } from "react";
import cartService from "../services/cart";
import CartProduct from "./CartProduct";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);


  useEffect(() => {
    let user = window.localStorage.getItem("loggedUser")
    user = JSON.parse(user)
    cartService.setToken(user.token);
  }, []);
  
  useEffect(() => {
    cartService.getCartProducts().then((item) => {
      const { cart } = item;
      setCartItems(cart.products);
    });
  }, []);

// app component not updating after deleting

  const handleDeleteProductFromCart = (id) => {
    // let user = window.localStorage.getItem("loggedUser");
    // user = JSON.parse(user);
    // cartService.setToken(user.token)
    cartService.delCartProduct(id);
    setCartItems({ ...cartItems });
    console.log(cartItems);
  };

  return (
    <div>
      {cartItems.length > 0 ? (
        cartItems.map((product) => (
          <CartProduct
            key={product.id}
            pName={product.productname}
            url={product.image.url}
            desc={product.description}
            desiredAmount={product.count}
            handleDeleteFromCart={() => handleDeleteProductFromCart(product.id)}
          />
        ))
      ) : (
        <h2>No items in your cart</h2>
      )}
    </div>
  );
};
export default Cart;
