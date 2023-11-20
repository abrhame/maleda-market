import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert, Stack } from "@mui/material";

import { loginUser } from "../../api/api";
import Helmet from "../../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { adminActions } from '../../store/shopping-cart/adminSlice'; 
import '../../styles/login.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const loginEmailRef = useRef();
  const loginPasswordRef = useRef();
  const confirmPasswordRef = useRef();  
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch(); 

  const handleUserLogin = async () => {
    const email = loginEmailRef.current.value;
    const password = loginPasswordRef.current.value;
    
    if (!validEmail(email)) {
      setError(true);
      setErrorMessage("Email is not valid.");
      return;
    }

    if (!validPassword(password)) {
      setError(true);
      setErrorMessage("Password must have a length of at least 8 characters.");
      return;
    }

    const userData = {
      email,
      password,
    };

    try {
      await loginUser(userData);
      setError(false); 

   
      dispatch(adminActions.setAuth(true));

      navigate('/dashboard');
    } catch (error) {
      setError(true);
      setErrorMessage(`Login Failed: ${error}`);
    }
  };

  const validEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const validPassword = (password) => {
    return password.length >= 8;
  }

  const submitHandler = (e) => {
    e.preventDefault();
    handleUserLogin();
  };

  return (
    <Helmet title="Login">
      <section className="login">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              <form className="form mb-5" onSubmit={submitHandler}>
                {error && (
                  <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="error">{errorMessage}</Alert>
                  </Stack>
                )}
                <div className="form__group">
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    ref={loginEmailRef}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    ref={loginPasswordRef}
                  />
                </div>

                <button type="submit" className="addTOCart__btn">
                  Login
                </button>
              </form>
              <Link className="link" to="/admin_register">
                Don't have an account? Create an account
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default AdminLogin;
