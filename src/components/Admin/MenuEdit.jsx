import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Helmet from "../Helmet/Helmet";

import CommonSection from "../../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { useDispatch } from "react-redux";
import "../../styles/product-details.css";

const MenuEdit = () => {
  const { id } = useParams();


  const product = products.find((product) => product.id === id);

  const [editedProduct, setEditedProduct] = useState({ ...product });

  const [imageFile, setImageFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({
      ...editedProduct,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const updateItem = () => {

    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
    }

    // dispatch(cartActions.updateItem(editedProduct));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <Helmet title="Edit Food Item">
      <CommonSection title="Edit Food Item" />
      <section>
        <Container>
          <Row>
            <Col lg="4" md="4">
              <div className="product__main-img">
                <img src={editedProduct.image01} alt="" className="w-100" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="single__product-content">
                <h2 className="product__title mb-3">
                  <input
                    type="text"
                    name="title"
                    value={editedProduct.title}
                    onChange={handleInputChange}
                  />
                </h2>
                <p className="product__price">
                  Price:{" "}
                  <span>
                    <input
                      type="number"
                      name="price"
                      value={editedProduct.price}
                      onChange={handleInputChange}
                    />
                  </span>
                </p>
                <p className="category mb-5">
                  Category: <span>{editedProduct.category}</span>
                </p>
                <button onClick={updateItem} className="addToCart__btn">
                  Update
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default MenuEdit;
