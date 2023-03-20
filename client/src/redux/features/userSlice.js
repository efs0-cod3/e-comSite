import { createSlice } from "@reduxjs/toolkit";
import cart from "../../services/cart";

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: null,
    username: null,
    name: null,
    cartProducts: []
   },
  reducers: {
    signedUser: (state, action) => {
        const {token, name, username} = action.payload
        state.token = token
        state.name = name
        state.username = username
    },
    getCartProducts: (state,action) => {
        state.cartProducts = action.payload
        providesTags: ["cart"]
    },
    addCartProducts: (state, action) => {
        const {id} = action.payload
        state.cartProducts.concat(id)
        invalidatesTags: ["cart"]
    },
    deleteCartProduct: (state, action) => {
        const { id } = action.payload
        state.cartProducts.splice(state.cartProducts.indexOf(id), 1)
        invalidatesTags: ["cart"]
    },
    logOut: (state, action) => {
      state.token = action.payload
      state.name = action.payload
      state.username = action.payload
  }
  },
});

export const { signedUser, addCartProducts, getCartProducts, deleteCartProduct, logOut } = userSlice.actions;

export default userSlice.reducer;
