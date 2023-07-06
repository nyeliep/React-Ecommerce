import React, { useState } from "react";
import './style.css'
import { useLocation , useNavigate} from "react-router-dom";

const ProductForm = () => {
  const [productData, setProductData] = useState({
    name: "",
    price: 0,
    discount: 0,
    image: null,
  });

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const newProductName = queryParams.get("name");
  const newProductPrice = queryParams.get("price");
  const newProductDiscount = queryParams.get("discount");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form submission and add the new product
  
    const reader = new FileReader();
  
    reader.onload = () => {
      const imageURL = reader.result;
  
      // Redirect to the products page with the new product details in query parameters
      const queryParams = new URLSearchParams();
      queryParams.set("name", productData.name);
      queryParams.set("price", productData.price);
      queryParams.set("discount", productData.discount);
      queryParams.set("image", imageURL);
      navigate(`/products?${queryParams.toString()}`);
    };
  
    reader.readAsDataURL(productData.image);
  };
  
  
  return (
    <div className="product-form">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="discount">Discount</label>
          <input
            type="number"
            id="discount"
            name="discount"
            value={productData.discount}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit">Add Product</button>
      </form>

      {newProductName && (
        <div className="new-product-details">
          <h3>New Product Details:</h3>
          {productData.image && (
            <img src={URL.createObjectURL(productData.image)} alt="Product" />
          )}
          <p> {newProductName}</p>
          <p>{newProductPrice}</p>
          <p>{newProductDiscount}</p>
        
        </div>
      )}
    </div>
  );
};

export default ProductForm;
