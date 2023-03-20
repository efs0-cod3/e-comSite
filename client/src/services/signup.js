import axios from "axios";
const baseUrl = "http://localhost:2121/api/register"

const signup = async (credentials) => {
    const res = await axios.post(baseUrl, credentials)
    return res.data
}

export default {signup}