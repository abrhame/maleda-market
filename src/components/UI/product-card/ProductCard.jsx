import React, { useState } from "react";

import "../../../styles/product-card.css";

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/shopping-cart/cartSlice";
import { Dialog } from "@mui/material";
import DialogActions from "@mui/material";
import DialogContent from "@mui/material";
import DialogContentText from "@mui/material";
import Box from '@mui/material/Box';
import FoodDetails from "../../../pages/FoodDetails";
import { API_BASE_URL } from "../../../api/base";


const ProductCard = (props) => {

  console.log(props.item, "prodact card")
  const {_id, productName, imgPath, price, qtyLeft }= props.item;
  const id = _id
  const title = productName;
  const image01 = imgPath[0];
  const quantity = qtyLeft;

  const handleAction = props.handleAction;

  const [showFoodDetails, setShowFoodDetails] = useState(false);
  const handleClose = () => setShowFoodDetails(false);
  const dispatch = useDispatch();
  
  // const addToCart = () => {
  //   dispatch(
  //     cartActions.addItem({
  //       id,
  //       title,
  //       image01,
  //       price,
  //     })
  //   );
  // };

  console.log(`${API_BASE_URL}/${image01}`)

  return (
    <div className="product__item">
      <div className="product__img">
        <img src={`${API_BASE_URL}/${image01}`} alt="product-img" className="w-50" />
      </div>

      <div className="product__content">
        <h5>
          {title}
        </h5>
        <div className=" d-flex align-items-center justify-content-between ">
          <span className="product__price">${price}</span>
          
          <button  onClick={() => setShowFoodDetails(true)} className="addTOCart__btn">
            Order
          </button>
        </div>
      </div>
      <Dialog 
      fullScreen={true}
      open={showFoodDetails}
      onClose={() => setShowFoodDetails(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      >
        <FoodDetails foods={props.item} handleClose = {handleClose} products={props.products} />
      </Dialog>
    </div>
  );
};

export default ProductCard;
