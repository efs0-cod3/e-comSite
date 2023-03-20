import React, {useState, useEffect} from 'react'
import { redirect } from "react-router-dom"
import Products from "./Products"
import productService from "../services/products"
import cartService from "../services/cart"


const Home = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
      productService.getAllProducts().then((product) => {
        setProducts(product);
      });
    }, []);
  


    // add to cart
  const handleAddToCart = (id) => {
    let user = window.localStorage.getItem("loggedUser")
    user = JSON.parse(user) 
    cartService.setToken(user.token)
    cartService.addToCart(id)
    
  }

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
  )
}

export default Home