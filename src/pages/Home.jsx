import React, {useRef, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Helmet from "../components/Helmet/Helmet.js";
import { Container, Row, Col,ListGroup, ListGroupItem } from "reactstrap";



import guyImg from "../assets/images/Pastedimage.jpeg";
import AllFoods from "./AllFoods.jsx";
import { cartUiActions } from "../store/shopping-cart/cartUiSlice";
import Footer from "../components/Footer/Footer.jsx";
import logo from "../assets/images/logo.jpg";
import { Link, Element } from "react-scroll";
import "../styles/hero-section.css";
import '../styles/home.css'
import "../styles/header.css";
const nav__links = [
  {
    display: "Home",
    path: "home",
  },
  {
    display: "Foods",
    path: "foods",
  },
  {
    display: "Contact",
    path: "contact",
  },
];
const Home = () => {
  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  const toggleCart = () => {
    dispatch(cartUiActions.toggle());
  };

  useEffect(() => {
    const scrollHandler = () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("header__shrink");
    } else if ( headerRef.current.classList.length!== null ) {
        headerRef.current.classList.remove("header__shrink");
      }
    };
  
    window.addEventListener("scroll", scrollHandler);
  
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);
  

  return (
    <div>
          <header className="header" ref={headerRef}>
      <Container>
        <div className="nav__wrapper d-flex align-items-center justify-content-between">
          <div className="logo">
            <img src={logo} alt="logo" />
            <h5>Maleda Market</h5>
          </div>

          {/* ======= menu ======= */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <div className="menu d-flex align-items-center gap-5">
              {nav__links.map((item, index) => (
                <Link
                  to={item.path}
                  spy={true} 
                  smooth={true} 
                  duration={500}
                  key={index}
                  className={(navClass) =>
                    navClass.isActive ? "active__menu" : ""
                  }
                >
                  {item.display}
                </Link>
              ))}
            </div>
          </div>

          {/* ======== nav right icons ========= */}
          <div className="nav__right d-flex align-items-center gap-4">
            <span className="cart__icon" onClick={toggleCart}>
              <i class="ri-shopping-basket-line"></i>
              <span className="cart__badge">{totalQuantity}</span>
            </span>

            <span className="mobile__menu" onClick={toggleMenu}>
              <i class="ri-menu-line"></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
    
    <div>
    <Element name="home">
    <Helmet title="Home">
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content">
                <h5 className="mb-3">Craving delicious food without the wait?</h5>
                <h1 className="mb-4 hero__title">
                  <span>Look</span> no further!
                </h1>
                <Link to="foods" spy={true} smooth={true} duration={500}>
                <button  className="order__btn d-flex align-items-center justify-content-between ">
  
                    Menu <i className="ri-arrow-right-s-line"></i>

                </button>
                </Link>
              </div>  
            </Col>

            <Col lg="6" md="6">
              <div className="hero__img">
                <img src={guyImg} alt="delivery-guy" className="home__img w-100" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
    </Element>
    <Element name="foods">
      <AllFoods/>
    </Element>
    
    </div>
    <Element name="contact">
              <Footer />
      </Element>
    </div>
  );
};

export default Home;