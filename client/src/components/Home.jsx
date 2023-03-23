import React, { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCartProducts } from "../redux/features/userSlice";
import cartService from "../services/cart";
import productService from "../services/products";
import "../styles/loader.css";
import Products from "./Products";
import Loader from "./loader";

const Home = () => {
  const user = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    productService.getAllProducts().then((product) => {
      setProducts(product);
    });
    setIsLoading(false)
  }, []);

  // add to cart
  const handleAddToCart = (id) => {
    if (!user.token) {
      return navigate("/login");
    }

    cartService.setToken(user.token);
    cartService.addToCart(id);
    dispatch(addCartProducts(id));
    toast.success("Product added to cart")

  };

  return (
    <div>
      <Toaster />
      { isLoading ? <Loader /> :
      <div className="products_container">
      {products.map((product) => (
        <Products
          key={product.id}
          pName={product.productname}
          url={product.image.url}
          desc={product.description}
          price={product.cost}
          handleAddToCart={() => handleAddToCart(product.id)}
        />
      ))}
    </div>}
    </div>
  );
};

export default Home;
