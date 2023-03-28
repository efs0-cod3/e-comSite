import axios from "axios";
const baseUrl = "http://localhost:2121/store";

let token = null;

const setToken = (newToken) => {
  token =  newToken;
};

const createStore = async (storeData) => {
  try {
    // se agrega url,data,config
    const res = await axios.post(`${baseUrl}/create`, {...storeData} , {
      headers: {
        "x-access-token": token,
      },
      data: {
        storename: storeData.storename,
        description: storeData.description
    }
    });
    return res.data;
  } catch (error) {
    console.log(error.response.data.message);
  }
};

const getStore = async () => {
  try {
    const res = await axios.get(`${baseUrl}/get`, {
      headers: {
        "x-access-token": token,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

// const delCartProduct = async (id) => {
//   try {
//     const res = await axios.delete(`${baseUrl}/delfromcart/${id}`, {
//       headers: {
//         "x-access-token": token,
//       },
//       data: id,
//     });
//     return res.data;
//   } catch (error) {
//     console.log(error.response);
//   }
// };

export default { setToken, createStore, getStore };
