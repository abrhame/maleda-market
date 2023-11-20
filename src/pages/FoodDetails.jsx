import React, { useState, useEffect } from "react";

import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";

import { useDispatch } from "react-redux";
import { cartActions } from "../store/shopping-cart/cartSlice";

import "../styles/product-details.css";

import ProductCard from "../components/UI/product-card/ProductCard";
import { useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import { API_BASE_URL } from "../api/base";

const FoodDetails = (props) => {
  console.log(props)
  const id = useParams();
  console.log(id)
  const {foods, products, handleClose} = props;
  console.log(products)
  console.log(foods)
  const product = products.find((pr) => pr._id === id.id);
  console.log(product)
  const { _id, productName, imgPath, price, qtyLeft } = foods;
  // const id = _id;
  const title = productName;
  const image01 = imgPath[0];
  const quantity = qtyLeft;
  const category = foods.productCategory;
  const desc = foods.description;
  console.log(props)
  

  
  const [tab, setTab] = useState("desc");
  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [reviewMsg, setReviewMsg] = useState("");
  const [showFoodDetails, setShowFoodDetails] = useState(false);
  const [instruction, setInstruction] = useState('');
  const handleInstructionChange = (event) => {
    event.preventDefault();
    setInstruction(event.target.value);
  }

  const dispatch = useDispatch();



  const [previewImg, setPreviewImg] = useState(image01);



  const addItem = () => {
    dispatch(
      cartActions.addItem({
        id:_id,
        title,
        price,
        image01,
        instruction,
      })
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(enteredName, enteredEmail, reviewMsg);
  };

  useEffect(() => {
    setPreviewImg(image01);
  }, [product]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [foods]);
  console.log("view")
  const handleModalClose = () =>{
    addItem();
    handleClose();
  }
  
  return (
    <Helmet title="Product-details">
      
      <section>
        <Container>
          <Row>
            {/* <Col lg="2" md="2">
              <div className="product__images">
                <div  
                  className="img__item mb-3"
                  onClick={() => setPreviewImg(`${API_BASE_URL}/${image01}`)}
                >
                  <img src={`${API_BASE_URL}/${image01}`} alt={title} className="w-50" />
                </div>
                <div
                  className="img__item mb-3"
                  onClick={() => setPreviewImg(`${API_BASE_URL}/${image01}`)}
                >
                  <img src={`${API_BASE_URL}/${image01}`} alt="" className="w-50" />
                </div> 

                <div
                  className="img__item"
                  onClick={() => setPreviewImg(`${API_BASE_URL}/${image01}`)}
                >
                  <img src={`${API_BASE_URL}/${image01}`} alt="" className="w-50" />
                </div>
              </div>
            </Col> */}

            <Col lg="4" md="4">
              <div className="product__main-img">
                <img src={`${API_BASE_URL}/${image01}`} alt="" className="w-100" />
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="single__product-content">
                <h2 className="product__title mb-3">{title}</h2>
                <p className="product__price">
                  {" "}
                  Price: <span>${price}</span>
                </p>
                <p className="category mb-5">
                  Category: <span>{category.title}</span>
                </p>
                <h6>Special instruction</h6>
                <textarea className="textarea" onChange={handleInstructionChange} value={instruction}></textarea>
                <button onClick={handleModalClose} className="addTOCart__btn">
                  Add to Cart
                </button>
                
              </div>
            </Col>

            <Col lg="12">
              <div className="tabs d-flex align-items-center gap-5 py-3">
                <h6
                  className={` ${tab === "desc" ? "tab__active" : ""}`}
                  onClick={() => setTab("desc")}
                >
                  Description
                </h6>
              </div>
              <div className="tab__content">
                  <p>{desc}</p>
                </div>
              

            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default FoodDetails;
