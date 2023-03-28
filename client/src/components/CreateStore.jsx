import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/storeForm.css";
import { useSelector, useDispatch } from "react-redux";
import storeService from "../services/store"
import { assignStore } from "../redux/features/userSlice";

const CreateStore = () => {
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.userReducer);
  const [storename, setStorename] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    storeService.setToken(token)
  }, [])
  

  const handleStoreNameChange = (e) => {
    setStorename(e.target.value);
  };

  const handleStoreNameDesc = (e) => {
    setDescription(e.target.value);
  };

  const createStore = async (e) => {
    e.preventDefault();
    try {
      const store = await storeService.createStore({
        storename,description
      })
      dispatch(assignStore(store))
    } catch (error) {
      setError(error)
    }
    console.log(error);
  };

  return (
    <div className="form_container">
      <form onSubmit={createStore} className="store_form">
        <div className="store_form_input">
          <label htmlFor="storename">Store name:</label>
          <input
            type="text"
            placeholder="John Cooper"
            name="storename"
            value={storename}
            onChange={handleStoreNameChange}
          />
        </div>

        <div className="store_form_input">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            placeholder="John Cooper"
            name="description"
            value={description}
            onChange={handleStoreNameDesc}
          />
        </div>

        <div className="form_button_container">
          <button>Create store</button>
        </div>
      </form>
    </div>
  );
};

export default CreateStore;
