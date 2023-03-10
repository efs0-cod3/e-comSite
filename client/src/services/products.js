import axios from "axios";
const baseUrl = "http://localhost:2121/product"

let token = null

const setToken = (newToken) => {
    token = newToken
}

const getAllProducts = async () => {
    const res = await axios.get(baseUrl+"/get")
    return res.data
}

export default {getAllProducts, setToken}