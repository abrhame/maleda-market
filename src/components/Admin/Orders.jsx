import React, { useState, useEffect } from "react";
import axios from "axios";
import Helmet from "../Helmet/Helmet";
import AdminHeader from "./AdminHeader";
import { API_BASE_URL } from "../../api/base";
import { Container, Row, Col } from "reactstrap";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import "../../styles/Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const handleFetchOrders = () => {
    axios
      .get(`${API_BASE_URL}/order`)
      .then((response) => {
        const fetchedOrders = response.data.payload.filter(
          (order) => order.reqStatus === "not_picked"
        );
        setOrders(fetchedOrders);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    handleFetchOrders();

    const intervalId = setInterval(() => {
      handleFetchOrders();
    }, 600); // Fetch data every 60 seconds

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handlePickedConfirmation = (orderId) => {
    setConfirmationDialogOpen(true);
    setSelectedOrderId(orderId);
  };

  const handlePicked = () => {
    setConfirmationDialogOpen(false);
    if (selectedOrderId) {
      axios
        .put(`${API_BASE_URL}/order/${selectedOrderId}`, { status: "picked" })
        .then(() => {
          const updatedOrders = orders.map((order) => {
            if (order._id === selectedOrderId) {
              return { ...order, reqStatus: "picked" };
            }
            return order;
          });
          setOrders(updatedOrders);
        })
        .catch((error) => {
          console.error("Error updating order status:", error);
        });
    }
  };

  const handleCloseConfirmationDialog = () => {
    setConfirmationDialogOpen(false);
    setSelectedOrderId(null);
  };

  const formatTime = (timeString) => {
    const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
    const formattedTime = new Date(timeString).toLocaleDateString(undefined, options);
    return formattedTime;
  };

  return (
    <>
      <Helmet title="Orders">
        <AdminHeader />
        <section className="order">
          <Container>
            <Row>
              <Col>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell style={{ backgroundColor: "orange", color: "white" }} className="header-cell">Name of User</TableCell>
                          <TableCell style={{ backgroundColor: "orange", color: "white" }} className="header-cell">Order</TableCell>
                          <TableCell style={{ backgroundColor: "orange", color: "white" }} className="header-cell">
                            Pickup Time
                            <Button className="sort-button" onClick={() => handleSortOrdersByPickupTime()}>
                              Sort
                            </Button>
                          </TableCell>
                          <TableCell style={{ backgroundColor: "orange", color: "white" }} className="header-cell">Status</TableCell>
                          <TableCell style={{ backgroundColor: "orange", color: "white" }} className="header-cell">Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {orders.map((order, orderIndex) => (
                          <TableRow key={order._id}>
                            <TableCell className="user-cell">{order.userName}</TableCell>
                            <TableCell className="order-cell">
                              {order.productInfo.map((productArray, arrayIndex) => (
                                <div key={arrayIndex} className="order-box ">
                                  {productArray.map((product, productIndex) => (
                                    <div key={productIndex} className="product-divider">
                                      {product.id.productName} (Qty: {product.quantity})
                                      <br />
                                      Instructions: {product.instruction}
                                      
                                    </div>
                                  ))}
                                </div>
                              ))}
                            </TableCell>
                            <TableCell className="time-cell">{order.timeOrder}</TableCell>
                            <TableCell className="status-cell">{order.reqStatus}</TableCell>
        
                            <TableCell className="action-cell">
                              <Button className="picked__btn" onClick={() => handlePickedConfirmation(order._id)}>
                                Picked
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Col>
            </Row>
          </Container>
        </section>
      </Helmet>
      <Dialog open={confirmationDialogOpen} onClose={handleCloseConfirmationDialog}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to mark this order as "Picked"?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmationDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePicked} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Orders;
