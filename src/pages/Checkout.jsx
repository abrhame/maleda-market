import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import Header from "../components/Header/Header";
import GooglePayButton from "@google-pay/button-react";
import "../styles/timeoptions.css";
import { API_BASE_URL } from "../api/base";
import "../styles/checkout.css";
import { Payment } from "@mui/icons-material";
import axios from "axios";

const Checkout = () => {
  const [enterName, setEnterName] = useState("");
  const [enterEmail, setEnterEmail] = useState("");
  const [enterNumber, setEnterNumber] = useState("");
  const [enterCountry, setEnterCountry] = useState("");
  const [times, setTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState("3:45");
  const [paid, setPaid] = useState(false);
  const [buttonColor, setButtonColor] = useState("default");
  const [buttonType, setButtonType] = useState("buy");
  const [buttonSizeMode, setButtonSizeMode] = useState("static");
  const [buttonWidth, setButtonWidth] = useState(240);
  const [buttonHeight, setButtonHeight] = useState(40);
  const [currentDate, setCurrentDate] = useState(""); // Store the current date

  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const modifiedCartItems = cartItems.map((item) => {
    // Create a new object without the 'image01' property
    const { image01, price, ...rest } = item;
    return rest;
  });

  const totalAmount = cartTotalAmount;

  const handlePaymentDataLoad = (paymentData) => {
    if (paymentData.paymentMethodData?.status === "SUCCESS") {
      setPaid(true);
      submitHandler();
    } else {
      setPaid(false);
    }
  };
  const date = new Date();
  const day = date.getDay();
  useEffect(() => {
    let start, end, interval;
    if (day >= 1 && day <= 3) {
      start = new Date(date.getTime());
      start.setHours(9, 45, 0, 0);
      end = new Date(date.getTime());
      end.setHours(19, 0, 0, 0);
      interval = 15;
    } else if (day >= 4 && day <= 6) {
      start = new Date(date.getTime());
      start.setHours(9, 45, 0, 0);
      end = new Date(date.getTime());
      end.setHours(19, 30, 0, 0);
      interval = 15;
    } else {
      start = new Date(date.getTime());
      start.setHours(10, 15, 0, 0);
      end = new Date(date.getTime());
      end.setHours(18, 30, 0, 0);
      interval = 15;
    }

    const timeSlots = [];

    while (start < end) {
      timeSlots.push(formatTime(start));
      start.setMinutes(start.getMinutes() + interval);
    }

    setTimes(timeSlots);
    setCurrentDate(formatDate(date)); // Get and format the current date

  }, []);

  function formatTime(date) {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  function formatDate(date) {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  const handleTimeChange = (e) => {
    setSelectedTime(`${formatDate(date)} / ${e.target.value}`);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const userShippingAddress = {
      userName: enterName,
      userEmail: enterEmail,
      userPhoneNumber: enterNumber,
      payed: paid,
      pickUpTime: selectedTime,
      totalPrice: cartTotalAmount,
    };

    const orderData = {
      cart: modifiedCartItems,
      user: userShippingAddress,
    };

    if (paid) {
      try {
        const response = await axios.post(
          `${API_BASE_URL}/order`,
          orderData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          }
        );
        localStorage.removeItem("cartItems");
        localStorage.removeItem("totalAmount");
        localStorage.removeItem("totalQuantity");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please pay first");
    }
  };

  const paymentRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: "CARD",
        parameters: {
          allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
          allowedCardNetworks: ["MASTERCARD", "VISA"],
        },
        tokenizationSpecification: {
          type: "PAYMENT_GATEWAY",
          parameters: {
            gateway: "example",
          },
        },
      },
    ],
    merchantInfo: {
      merchantId: "12345678901234567890",
      merchantName: "Demo Merchant",
    },
    transactionInfo: {
      totalPriceStatus: "FINAL",
      totalPriceLabel: "Total",
      totalPrice: `${totalAmount}`,
      currencyCode: "USD",
      countryCode: "US",
    },
  };

  return (
    <Helmet title="Checkout">
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <h6 className="mb-4">Provide your contact info</h6>
              <p>
                Let’s make sure that you and your order can find each other. Provide your name, phone number, and email for a flawless pickup.
              </p>
              <form className="checkout__form" onSubmit={submitHandler}>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    required
                    onChange={(e) => setEnterName(e.target.value)}
                  />
                </div>

                <div className="form__group">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    required
                    onChange={(e) => setEnterEmail(e.target.value)}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="tel"
                    placeholder="Phone number"
                    required
                    onChange={(e) => setEnterNumber(e.target.value)}
                  />
                </div>
                <h6>Select Pick up Time</h6>
                <p>Date: {currentDate}</p>
                <select className="time" onChange={handleTimeChange} value={selectedTime}>
                  {times.map((time) => (
                    <option key={time}>{time}</option>
                  ))}
                </select>
                <GooglePayButton
                  environment="TEST"
                  buttonColor={buttonColor}
                  buttonType={buttonType}
                  buttonSizeMode={buttonSizeMode}
                  paymentRequest={paymentRequest}
                  onLoadPaymentData={handlePaymentDataLoad}
                  style={{ width: buttonWidth, height: buttonHeight }}
                />
              </form>
            </Col>
            <Col lg="5" md="6">
              <div className="checkout__bill">
                <h6 className="d-flex align-items-center justify-content-between mb-3">
                  Subtotal: <span>${totalAmount.toFixed(2)}</span>
                </h6>
                <div className="checkout__total">
                  <h5 className="d-flex align-items-center justify-content-between">
                    Total: <span>${totalAmount.toFixed(2)}</span>
                  </h5>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;
