import React from "react";
import { Link } from "react-router-dom";



const CreateAccountCart= () => {
  return (
    <div>
        <h2>Create an Account and start buying our deals!</h2> 
        <Link to={"/signin"}>Sign in</Link>  
    </div>
  );
};
export default CreateAccountCart;
