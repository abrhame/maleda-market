  import React, {useEffect} from "react";
  import { Routes, Route, Navigate } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";

  import Home from "../pages/Home";
  import AllFoods from "../pages/AllFoods";
  import FoodDetails from "../pages/FoodDetails";
  import Cart from "../pages/Cart";
  import Checkout from "../pages/Checkout";
  import Contact from "../pages/Contact";
  import { NavLink } from "reactstrap";
  import { checkAuth } from "../store/shopping-cart/adminSlice";
  import Dashboard from "../components/Admin/Dashboard";
  import MenuManagement from "../components/Admin/MenuManagement";
  import MenuEdit from "../components/Admin/MenuEdit";
  import Orders from "../components/Admin/Orders";
  import AdminLogin from "../components/Admin/AdminLogin";
  import AdminRegister from "../components/Admin/AdminRegister";
  import Setting from "../components/Admin/Setting";



  const Routers = () => {
    const ProtectedRoute = ({ element, isAuthenticated, ...rest }) => {
      return isAuthenticated ? (
        element
      ) : (
        <NavLink to="/adminlogin" />
      );
    };
  

      const dispatch = useDispatch();
  
      const isAuthenticated = useSelector((state) => state.admin.isAdminAuthenticated);
      useEffect(() => {
        dispatch(checkAuth());
      }, [dispatch]);
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/foods" element={<AllFoods />} />
        <Route path="/foods/:id" element={<FoodDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/adminlogin" element={<Navigate to="/adminlogin" />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} isAuthenticated={isAuthenticated} />} />
        <Route path="/menu_management" element={<ProtectedRoute element={<MenuManagement />} isAuthenticated={isAuthenticated} />} />
        <Route path="/admin/menu/:id" element={<ProtectedRoute element={<MenuEdit />} isAuthenticated={isAuthenticated} />} />
        <Route path="/orders" element={<ProtectedRoute element={<Orders />} isAuthenticated={isAuthenticated} />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admin_register" element={<AdminRegister />} />
        <Route path="/settings" element={<Setting />} />
      </Routes>
    );
  };
  
export default Routers;