import { createSlice } from "@reduxjs/toolkit";
import { verifyToken } from "../../api/api"; 

const initialState = {
  isAdminAuthenticated: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAdminAuthenticated = action.payload;
    },
  },
});

export const { setAuth } = adminSlice.actions;

export const checkAuth = () => async (dispatch) => {
    
  const token = localStorage.getItem("userToken");
  if (token) {
    try {
      const response = await verifyToken(token);  
      const { data } = response;
      if (data.payload) {
        dispatch(setAuth(data.payload));
      } else {
        dispatch(setAuth(data.payload));
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      dispatch(setAuth(false));
    }
  } else {
    dispatch(setAuth(false));
  }
};

export const adminActions = adminSlice.actions; 
export default adminSlice;
