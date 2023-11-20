import React from "react";
import { Container, Row, Col } from "reactstrap";
import categoryImg01 from "../../../assets/images/coffee.png";
import categoryImg02 from "../../../assets/images/take-away.png";
import categoryImg03 from "../../../assets/images/meat.png";
import categoryImg04 from "../../../assets/images/soft-drink.png";
import categoryImg05 from "../../../assets/images/breade.png";
import categoryImg06 from "../../../assets/images/coffe.png";
import categoryImg07 from "../../../assets/images/canned-food.png";
import categoryImg08 from "../../../assets/images/household.png";
import categoryImg09 from "../../../assets/images/groceries.png";
import "../../../styles/category.css";

const categoryData = [
  {
    display: "Hot Drinks",
    imgUrl: categoryImg01,
  },
  {
    display: "Take Out - Menu",
    imgUrl: categoryImg02,
  },
  {
    display: "Side Items 5 OZ",
    imgUrl: categoryImg03,
  },
  {
    display: "Soft Drinks",
    imgUrl: categoryImg04,
  },
  {
    display: "BaKERY",
    imgUrl: categoryImg05,
  },
  {
    display: "Coffee and Tea Products",
    imgUrl: categoryImg06,
  },
  {
    display: "Canned/Jarred Goods",
    imgUrl: categoryImg07,
  },
  {
    display: "HouseHold",
    imgUrl: categoryImg08,
  },
  {
    display: "Grocery",
    imgUrl: categoryImg09,
  },
];

const Category = ({ onSelectCategory }) => {
  const handleCategoryClick = (category) => {
    onSelectCategory(category);
  };

  return (
    <Container>
      <Row>
        <h5 className="mb-4">Categories</h5>
        {categoryData.map((item, index) => (
          <Col lg="3" md="4" sm="6" xs="6" className="mb-4" key={index}>
            <div
              className="category__item d-flex align-items-center gap-3"
              onClick={() => handleCategoryClick(item.display)}
            >
              <div className="category__img">
                <img className="category__img" src={item.imgUrl} alt="category__item" />
              </div>
              <h6>{item.display}</h6>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Category;
