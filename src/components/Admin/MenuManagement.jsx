import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../api/base";
import Helmet from "../Helmet/Helmet";
import AdminHeader from "./AdminHeader";
import "../../styles/cart-page.css";
import Catagories from "./Catagories";
import { Container, Row, Col } from "reactstrap";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "../../styles/MenuManagment.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useMediaQuery } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MenuManagement = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [products, setProducts] = useState([]);
  const onClose = () => setShowDialog(false);
  const onOpen = () => setShowDialog(true);

  const handleFetchProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
      setProducts(
        response.data.msg.map((product) => ({
          ...product,
          isEditing: false,
          updatedName: product.productName,
        }))
      );
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    handleFetchProducts();
  }, []);

  const isSmallScreen = useMediaQuery("(max-width:991px)");

  return (
    <Helmet title="Menu Management">
    <AdminHeader />
    <section className="menu_section">
      <Dialog
        fullScreen
        className="dialog"
        open={showDialog}
        onClose={onClose}
        TransitionComponent={Transition}
      >
        <div className="close-btn-container">
          <IconButton
            className="close-btn"
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </div>
        <Catagories />
      </Dialog>
      <Container>
        <Button
          onClick={onOpen}
          style={{ background: "orange", fontWeight: "bold", margin: "0.5rem 0rem" }}
          variant="contained"
        >
          Add New
        </Button>

        {products.length === 0 ? (
          <h5 className="text-center">Your Menu is Empty</h5>
        ) : (
          <TableContainer className="table" component={Paper}>
            <Table sx={{ minWidth: 350 }} aria-label="simple table">
              <TableHead style={{ backgroundColor: "orange", color: "white" }}>
                <TableRow>
                  <TableCell style={{ backgroundColor: "orange", color: "white" }}>Image</TableCell>
                  <TableCell style={{ backgroundColor: "orange", color: "white" }} align="right">Product Title</TableCell>
                  <TableCell style={{ backgroundColor: "orange", color: "white" }} align="right">Price</TableCell>
                  <TableCell style={{ backgroundColor: "orange", color: "white" }} align="right">Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((row) => (
                  <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell style={{ backgroundColor: "orange", color: "white" }} className="cart__img-box" component="th" scope="row">
                      <img src={`${API_BASE_URL}/${row.imgPath[0]}`} alt={row.productName} />
                    </TableCell>
                    <TableCell align="right">{row.productName}</TableCell>
                    <TableCell align="right">${row.price}</TableCell>
                    <TableCell align="right">{row.qtyLeft}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
 </Container>
    </section>
  </Helmet>
  );
};

export default MenuManagement;
