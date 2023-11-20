import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  createCategory,
  deleteCategory,
  fetchCategories,
  updateCategory,
} from "../../api/api";
import { API_BASE_URL } from "../../api/base";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Card from '@mui/material/Card';
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import "../../styles/categories.css"
import styled from "styled-components";




const ProductCreationContainer = styled.div`
  margin: 16px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormLabel = styled.p`
  font-size: 18px;
  color: #555;
  margin-bottom: 8px;
`;

const ProductForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputField = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 8px 0;
`;

const ImageInput = styled.input`
  margin: 8px 0;
`;

const CreateProductButton = styled(Button)`
  background-color: orange !important;
  color: white !important;
  margin: 8px 0;
`;


// create a a catagroy

const CategoryCreationContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 16px 0;
`;

const CategoryInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 16px;
`;

const CreateCategoryButton = styled(Button)`
  background-color: orange !important;
  color: white !important;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background-color: orange;
  color: white;
`;

const TableRow = styled.tr`
  border: 1px solid #ccc;
  &:nth-child(even) {
    background-color: #f8f8f8;
  }
`;

const TableHeaderCell = styled.th`
  padding: 10px;
  text-align: left;
`;

const TableCell = styled.td`
  padding: 10px;
`;

const ActionsCell = styled.td`
  text-align: right;
`;

const ActionButton = styled(Button)`
  background-color: orange !important;
  color: white !important;
  margin: 0 5px;
`;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
  header: {
    fontSize: "24px",
    fontWeight: "bold",
    margin: "16px 0",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  button: {
    margin: "0 1rem",
  },
  title: {
    display: "inline-block",
  
    
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "8px 0",
  },
  select: {
    minWidth: "200px",
    marginBottom: "16px",
  },
  input: {
    margin: "8px 0",
  },
  updateButton: {
    background: "white",
    "&:hover": {
      background: "lightgreen",
    },
  },
  deleteButton: {
    background: "white",
    "&:hover": {
      background: "lightcoral",
    },
  },
  imageInput: {
    margin: "8px 0",
  },

};

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [updatedCategoryName, setUpdatedCategoryName] = useState("");
  const [products, setProducts] = useState([]);
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState(0);
  const [newProductQtyLeft, setNewProductQtyLeft] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [newProductDescription, setnewProductDescription] = useState("")

  const handleFetchCategories = async () => {
    try {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData.msg);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    handleFetchCategories();
  }, []);

  const handleCreatingCategory = async () => {
    await createCategory(newCategory);
    handleFetchCategories();
    setNewCategory("");
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category._id);
    setUpdatedCategoryName(category.title);
  };

  const handleSaveCategory = async (category) => {
    if (updatedCategoryName.trim() === "") {
      console.error("Category name cannot be empty");
      return;
    }
    

    await updateCategory(category._id, updatedCategoryName);
    setEditingCategory(null);
    setUpdatedCategoryName("");
    handleFetchCategories();
  };

  const handleCancelCategoryEdit = () => {
    setEditingCategory(null);
    setUpdatedCategoryName("");
  };

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

  const handleCreatingProduct = async () => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        throw new Error("User is not logged in");
      }
      if (!selectedCategory) {
        console.error("Please select a category for the product");
        return;
      }

      const formData = new FormData();
      formData.append("productType", selectedCategory);
      formData.append("productName", newProductName);
      formData.append("price", newProductPrice);
      formData.append("qtyLeft", newProductQtyLeft);
      formData.append("description", newProductDescription);
      for (let i = 0; i < selectedImage.length; i++) {
        formData.append("images", selectedImage[i]);
      }

      const response = await axios.post(`${API_BASE_URL}/products`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setNewProductName("");
      setNewProductPrice(0);
      setNewProductQtyLeft(0);
      setSelectedCategory("");
      setSelectedImage(null);

      handleFetchProducts();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleEditProduct = (product) => {
    const updatedProducts = products.map((p) =>
      p._id === product._id ? { ...p, isEditing: true } : p
    );
    setProducts(updatedProducts);
    setNewProductName(product.updatedName); 
    setNewProductPrice(product.price); 
    setNewProductQtyLeft(product.qtyLeft); 
  };

  const handleProductNameChange = (product, newName) => {
    const updatedProducts = products.map((p) =>
      p._id === product._id ? { ...p, updatedName: newName } : p
    );
    setProducts(updatedProducts);
  };

  const handleSaveProduct = async (product) => {
    console.log(product)
    try {
      const formData = new FormData();
      formData.append("productName", product.updatedName);
      formData.append("price", product.price);
      formData.append("qtyLeft", product.qtyLeft);
      for (let i = 0; i < selectedImage.length; i++) {
        formData.append("images", selectedImage[i]);
      }

      const token = localStorage.getItem("userToken");

      const response = await axios.put(`${API_BASE_URL}/products/${product._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(formData)
      console.log(response)
      setSelectedImage(null);

      handleFetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleCancelProductEdit = (product) => {
    const updatedProducts = products.map((p) =>
      p._id === product._id ? { ...p, isEditing: false } : p
    );
    setProducts(updatedProducts);
  };

  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        throw Error("User is not logged in");
      }

      await axios.delete(`${API_BASE_URL}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Product Categories</h2>
      <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Category Name</TableHeaderCell>
          <TableHeaderCell>Actions</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <tbody>
        {categories.map((category) => (
          <TableRow key={category._id}>
            <TableCell>
              {category._id === editingCategory ? (
                <div>
                  <input
                    className="input"
                    type="text"
                    value={updatedCategoryName}
                    onChange={(e) => setUpdatedCategoryName(e.target.value)}
                  />
                </div>
              ) : (
                <div>{category.title}</div>
              )}
            </TableCell>
            <ActionsCell>
              {category._id === editingCategory ? (
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSaveCategory(category)}
                  >
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleCancelCategoryEdit}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <div>
                  <ActionButton
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEditCategory(category)}
                  >
                    Edit
                  </ActionButton>
                  <ActionButton
                    variant="outlined"
                    color="secondary"
                    onClick={() => deleteCategory(category._id)}
                  >
                    Delete
                  </ActionButton>
                </div>
              )}
            </ActionsCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
    <CategoryCreationContainer>
      <h4>Create New Category:</h4>
      <CategoryInput
        type="text"
        className="input"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="New Category Name"
      />
      <CreateCategoryButton
        variant="contained"
        onClick={handleCreatingCategory}
      >
        Create Category
      </CreateCategoryButton>
    </CategoryCreationContainer>

      <h2 style={styles.header}>Products</h2>

      <h6>Select Categories</h6>

          <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Product Name</TableHeaderCell>
          <TableHeaderCell>Actions</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <tbody>
        {products.map((product) => (
          <TableRow key={product._id}>
            <TableCell>{product.isEditing ? (
  <div>
    <ImageInput
      type="file"
      accept="image/*"
      onChange={(e) => setSelectedImage(e.target.files)}
    />
  </div>
) : (
  <div>
    <input
      type="text"
      value={product.updatedName}
      onChange={(e) => handleProductNameChange(product, e.target.value)}
    />
    <div>{product.productName}</div>
  </div>
)}</TableCell>
            <TableCell>{product.isEditing ? (
              <div>
                <input
                  type="number"
                  value={newProductPrice}
                  onChange={(e) => setNewProductPrice(e.target.value)}
                />
              </div>
            ) : (
              <div>{product.price}</div>
            )}</TableCell> <TableCell>{product.isEditing ? (
              <div>
                <input
                  type="number"
                  value={product.qtyLeft}
                  onChange={(e) => setNewProductQtyLeft(e.target.value)}
                />
              </div>
            ) : (
              <div>{product.qtyLeft}</div>
            )}</TableCell>
            <ActionsCell>
              {product.isEditing ? (
                <div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSaveProduct(product)}
                  >
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleCancelProductEdit(product)}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <div>
                  <ActionButton
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEditProduct(product)}
                  >
                    Edit
                  </ActionButton>
                  <ActionButton
                    variant="outlined"
                    color="secondary"
                    onClick={() => deleteProduct(product._id)}
                  >
                    Delete
                  </ActionButton>
                </div>
              )}
            </ActionsCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
    <ProductCreationContainer>
      
      <h4>Add New Product</h4>
      
      <ProductForm>
      
      <div className="wrapper">
      <Card>
      <div className="right">
      <p>Slelect Product Catagory</p>
        <FormControl style={{ minWidth: "200px", marginBottom: "16px" }}>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <MenuItem value="">Select Category</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category._id} value={category.title}>
                {category.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <p>pick the image</p>
        <ImageInput
          type="file"
          accept="image/*"
          onChange={(e) => setSelectedImage(e.target.files)}
        />
        <p>Product Name</p>
        <InputField
          type="text"
          value={newProductName}
          onChange={(e) => setNewProductName(e.target.value)}
          placeholder="Product Name"
        />
        </div>
        </Card>
        <Card>
        <div className="left">
        <p>Product Price</p>
        <InputField
          type="number"
          value={newProductPrice}
          onChange={(e) => setNewProductPrice(Number(e.target.value))}
          placeholder="Product Price"
        />
        <p>Product Quantity left</p>
        <InputField
          type="number"
          value={newProductQtyLeft}
          onChange={(e) => setNewProductQtyLeft(Number(e.target.value))}
          placeholder="Quantity Left"
        />
        <p>Product Description</p>
                <TextField
                  type="text"
                  value={newProductDescription}
                  onChange={(e) => setnewProductDescription(e.target.value)}
                  placeholder="Product Description"
                />
        </div>
        </Card>
        </div>
        <CreateProductButton
          variant="contained"
          onClick={handleCreatingProduct}
        >
          Create Product
        </CreateProductButton>
      </ProductForm>
    </ProductCreationContainer>
    </div>
  );
};

export default Categories;
