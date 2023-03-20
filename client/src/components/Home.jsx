import React, { useState, useEffect } from "react";
import Products from "./Products";
import productService from "../services/products";
import cartService from "../services/cart";
import { useDispatch } from "react-redux";
import { addCartProducts } from "../redux/features/userSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const user = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productService.getAllProducts().then((product) => {
      setProducts(product);
    });
  }, []);

  // add to cart
  const handleAddToCart = (id) => {
    if (!user.token) {
      return navigate("/login");
    }

    cartService.setToken(user.token);
    cartService.addToCart(id);
    dispatch(addCartProducts(id));
  };

  return (
    <div>
      {products.map((product) => (
        <Products
          key={product.id}
          pName={product.productname}
          url={product.image.url}
          desc={product.description}
          handleAddToCart={() => handleAddToCart(product.id)}
        />
      ))}
    </div>
  );
};

export default Home;
