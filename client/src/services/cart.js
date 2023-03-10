import axios from "axios";
const baseUrl = "http://localhost:2121/cart";

let token = null;

const setToken = (newToken) => {
  token =  newToken;
};

const addToCart = async (id) => {
  try {
    // se agrega url,data,config
    const res = await axios.post(`${baseUrl}/addtocart/${id}`, id, {
      headers: {
        "x-access-token": token,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error.response);
  }
};

const getCartProducts = async () => {
  try {
    const res = await axios.get(baseUrl, {
      headers: {
        "x-access-token": token,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

const delCartProduct = async (id) => {
  try {
    const res = await axios.delete(`${baseUrl}/delfromcart/${id}`, {
      headers: {
        "x-access-token": token,
      },
      data: id,
    });
    return res.data;
  } catch (error) {
    console.log(error.response);
  }
};

export default { setToken, addToCart, getCartProducts, delCartProduct };
