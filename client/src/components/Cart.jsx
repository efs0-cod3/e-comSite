import React, { useEffect, useState } from "react";
import cartService from "../services/cart";
import CartProduct from "./CartProduct";
import Loader from "./loader";
import toast, { Toaster } from 'react-hot-toast';
import { useSelector, useDispatch } from "react-redux";
import {deleteCartProduct, getCartProducts} from "../redux/features/userSlice"
import "../styles/loader.css"
import "../styles/cartProducts.css"


const Cart = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const {token, cartProducts} = useSelector(state => state.userReducer)

  useEffect(() => {
    cartService.setToken(token);
  }, []);
  // const [cartItems, setCartItems] = useState([])
  useEffect(() => {
    cartService.getCartProducts().then((cart) => {
          dispatch(getCartProducts(cart.cart.products))
          setLoading(false)
    })
  }, []);

// app component not updating after deleting

  const handleDeleteProductFromCart = (id) => {
    cartService.delCartProduct(id);
    dispatch(deleteCartProduct(id))
    toast.success("Product deleted")
  };

  return (
    <div>
      <Toaster />
      {loading && token ? 
      <Loader /> : 
      cartProducts.length > 0 ? (
        cartProducts?.map((product) => (
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
        <h2>Your Ecom Cart is empty</h2>
      )}
    
    </div>
  );
};
export default Cart;
