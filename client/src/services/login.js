import axios from "axios";
const baseUrl = "http://localhost:2121/api/login"

const login = async (credentials) => {
    const res = await axios.post(baseUrl, credentials)
    return res.data
}

export default {login}