import React, { useRef, useState } from "react";
import { registerUser } from "../../api/api";
import Helmet from "../../components/Helmet/Helmet";
import { Alert, Stack } from "@mui/material";
import { Container, Row, Col } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../api/base";
import '../../styles/login.css';

const AdminRegister = () => {
  const navigate = useNavigate();
  const signupNameRef = useRef();
  const signupEmailRef = useRef();
  const signupPasswordRef = useRef();
  const signupConfirmPasswordRef = useRef();
  const [error, setError] = useState(null);

  const handleRegistration = async() => {
    const userName = signupNameRef.current.value;
    const email = signupEmailRef.current.value;
    const password = signupPasswordRef.current.value;
    const confirm_password = signupConfirmPasswordRef.current.value;

    if (!validName(userName)) {
      setError("Invalid Name, The length of the characters must be at least 3");
      return;
    }

    if (!validEmail(email)){
      setError("Invalid Email, Follow the correct format");
      return;
    }

    if (!validPassword(password)) {
      setError("Invalid Password, The length of the Password must be at least 8 characters");
      return;
    }

    if (!passwordMatch(password, confirm_password)) {

      setError("Password does not match");
      return;
    }

    const userData = {
      userName,
      email,
      password,
      confirm_password
    }

    try {
      await registerUser(userData);
      setError(null); // Clear any previous error messages
      navigate('/login');
    } catch(error) {
      setError(`Registration Failed, try again: ${error}`);
    }
  }

  const validName = (name) => {
    return name.length >= 3
  }

  const validEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const validPassword = (password) => {
    return password.length >= 8; 
  }

  const passwordMatch = (password, confirm_password) => {  
    return password === confirm_password;
  }
  const submitHandler = (e) => {
    e.preventDefault();
    handleRegistration();
  };

  return (
    <Helmet title="Signup">
      <section className="login">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              <form className="form mb-5" onSubmit={submitHandler}>
                {error && (
                  <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity="error">{error}</Alert>
                  </Stack>
                )}
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Full name"
                    required
                    ref={signupNameRef}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    ref={signupEmailRef}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    ref={signupPasswordRef}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    ref={signupConfirmPasswordRef}
                  />
                </div>
                <button type="submit" className="addTOCart__btn">
                  Sign Up
                </button>
              </form>
              <Link className="link" to="/adminlogin">Already have an account? Login</Link>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default AdminRegister;