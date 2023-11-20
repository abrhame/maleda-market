import axios from "axios";
import { API_BASE_URL } from "./base";

function storeUserToken(token) {
  localStorage.setItem("userToken", token);
}

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(`HTTP Error: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
}

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, userData);
    if (response.data.msg !== false) {
        storeUserToken(response.data.token);
        const userInfo = {
          userName: response.data.userName,
          email: response.data.email,
        };
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
      return response.data;
    } else {
      throw new Error(`Error: ${response.data.msg}`);
    }
  } catch (error) {
    throw error;
  }
}

export const fetchCategories = async () => {
  try {
    const token = localStorage.getItem("userToken");
    if (!token) {
      throw new Error("User is not logged in"); 
    
    }

    const response = await axios.get(`${API_BASE_URL}/producttype`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response)
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const createCategory = async (name) => {
  try {
    console.log(name)
    const token = localStorage.getItem("userToken");
    if (!token) {
      throw new Error("User is not logged in"); 
    }
    const response = await axios.post(`${API_BASE_URL}/producttype`, { title: name },{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data)
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(`HTTP Error: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
}

export const updateCategory = async (id, name) => {
  const token = localStorage.getItem("userToken");
  if (!token) {
    throw new Error("User is not logged in"); 
  }
  try {
    const response = await axios.put(`${API_BASE_URL}/producttype/${id}`, { title: name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response)
    if (response.status >= 200 && response.status < 300) {
      return true;
    } else {
      throw new Error(`HTTP Error: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
}

export const deleteCategory = async (id) => {

  const token = localStorage.getItem("userToken");
  if (!token) {
    throw new Error("User is not logged in"); 
  }
  try {
    const response = await axios.delete(`${API_BASE_URL}/producttype/${id}`,      
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },);
    if (response.status >= 200 && response.status < 300) {
      return true;
    } else {
      throw new Error(`HTTP Error: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
}


export const verifyToken = async (token) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/verifyToken`, { token });
    console.log(response)
    return response; 
  } catch (error) {
    console.error("Error verifying user token:", error);
    return false; 
  }
};




// change the password of the user

export const ChangePassword = async (userData, token) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/changepassword`,
      userData,
      { 
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.meg === true) {
      storeUserToken(response.data.token);
      return response.data;
    } else {
      throw new Error(`HTTP Error: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
    return `Error changing the password: ${error}`;
  }
};
