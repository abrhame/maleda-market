import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert, Stack } from "@mui/material";

import { loginUser, ChangePassword } from "../../api/api";
import Helmet from "../../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import AdminHeader from "./AdminHeader";


const Setting = () => {
  const navigate = useNavigate();
  const currentPasswordRef = useRef();
  const newPasswordRef = useRef();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch(); 

  const handleUserLogin = async () => {
    const currentPassword = currentPasswordRef.current.value;
    const newPassword = newPasswordRef.current.value;

    if (!validPassword(currentPassword)) {
      setError(true);
      setErrorMessage("Current Password must have a length of at least 8 characters");
      return

    }

    if (!validPassword(newPassword)) {
      setError(true);
      setErrorMessage('New password must have a length of at least 8  characters')
    }

    
    
  
    const userData = {
      currentPassword,
      newPassword,
    };

    try {
      await ChangePassword(userData);
      setError(false); 
      navigate('/adminlogin');
    } catch (error) {
      setError(true);
      setErrorMessage(`Login Failed: ${error}`);
    }
  };


  const validPassword = (password) => {
    return password.length >= 8;
  }

  const submitHandler = (e) => {
    e.preventDefault();
    handleUserLogin();
  };

  

  return (
    <Helmet title="Login">
      <AdminHeader />
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
                    type="password"
                    placeholder="Current Password"
                    required
                    ref={currentPasswordRef}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    ref={newPasswordRef}
                  />
                </div>

                <button type="submit" className="addTOCart__btn">
                  Save
                </button>
              </form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Setting; 
