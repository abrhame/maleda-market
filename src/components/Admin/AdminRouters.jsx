import React, {useEffect} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";


import Dashboard from "./Dashboard";
import MenuManagement from "./MenuManagement";
import MenuEdit from "./MenuEdit";
import Orders from "./Orders";
import AdminLogin from "./AdminLogin";
import AdminRegister from "./AdminRegister";
import { NavLink } from "reactstrap";
import { checkAuth } from "../../store/shopping-cart/adminSlice";
import Setting from "./Setting";
import Page from "../UI/_404";


const ProtectedRoute = ({ element, isAuthenticated, ...rest }) => {
  return isAuthenticated ? (
    element
  ) : (
    <NavLink to="/adminlogin" />
  );
};


const AdminRouters = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.admin.isAdminAuthenticated);
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/adminlogin" element={<Navigate to="/adminlogin" />} />
      <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} isAuthenticated={isAuthenticated} />} />
      <Route path="/menu_management" element={<ProtectedRoute element={<MenuManagement />} isAuthenticated={isAuthenticated} />} />
      <Route path="/admin/menu/:id" element={<ProtectedRoute element={<MenuEdit />} isAuthenticated={isAuthenticated} />} />
      <Route path="/orders" element={<ProtectedRoute element={<Orders />} isAuthenticated={isAuthenticated} />} />
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route path="/admin_register" element={<AdminRegister />} />
      <Route path="/settings" element={<Setting />} />
      {/* <Route path="*" element={<Page />} /> */}
    </Routes>
  );
};

export default AdminRouters;


