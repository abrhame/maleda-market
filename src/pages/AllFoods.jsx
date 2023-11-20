import React, { useState, useEffect } from "react";
import axios from "axios";
import Helmet from "../components/Helmet/Helmet";
import ReactDOM from "react-dom";
import { Container, Row, Col } from "reactstrap";
import { API_BASE_URL } from "../api/base";
import ProductCard from "../components/UI/product-card/ProductCard";
import ReactPaginate from "react-paginate";
import Category from "../components/UI/category/Category";
import "../styles/all-foods.css";
import "../styles/pagination.css";



const AllFoods = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
 
  const [selectedFood, setSelectedFood] = useState(null);
  const [products, setProducts] = useState([]);

  const handleFetchProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
      console.log(response.data.msg)
      
      setProducts(response.data.msg);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    handleFetchProducts();
  }, []);

  const searchedProduct = products.filter((item) => {
    if (searchTerm === "" && (selectedCategory === null || item.category === selectedCategory)) {
      return item;
    }
    if (
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === null || item.category === selectedCategory)
    ) {
      return item;
    } else {
      return null;
    }
  });


  const handleAction = (food) => {
    setSelectedFood(food);
    setShowFoodDetails(true);
  };

  return (
    <Helmet title="All-Foods">
      <section className="foods">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6" xs="12">
              <div className="search__widget d-flex align-items-center justify-content-between">
                <input
                  type="text"
                  placeholder="I'm looking for...."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col>
            <Col lg="6" md="6" sm="6" xs="12" className="mb-5">
              <div className="sorting__widget text-end">
                <select className="w-50">
                  <option>Default</option>
                  <option value="ascending">Alphabetically, A-Z</option>
                  <option value="descending">Alphabetically, Z-A</option>
                  <option value="high-price">High Price</option>
                  <option value="low-price">Low Price</option>
                </select>
              </div>
            </Col>
            <Category onSelectCategory={setSelectedCategory} />
            {products.map((item) => (
              <Col lg="3" md="4" sm="6" xs="6" key={item._id} className="mb-4">
                <ProductCard item={item} handleAction={() => handleAction(item)} products={products} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default AllFoods;
