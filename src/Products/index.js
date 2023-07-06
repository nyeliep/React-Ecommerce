import React, { useState, useEffect } from "react";
import './style.css'
import { Link, useNavigate, useLocation } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://dummyjson.com/products');
        const result = await response.json();
        setProducts(result.products);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    getProducts();
  }, []);



  const handleAddProduct = () => {
    navigate("/product-form");
  };

  console.log({products});

  const queryParams = new URLSearchParams(location.search);
  const newProductName = queryParams.get("name");
  const newProductPrice = queryParams.get("price");
  const newProductDiscount = queryParams.get("discount");
  const newProductImage = queryParams.get("image")


  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="product">
      <div className="add-product">
        <button onClick={handleAddProduct} className="addBtn">Add New Product</button>
      </div>
      {newProductName && (
        <div className="new-product-details">
             {newProductImage && (
            <img src={newProductImage} alt={newProductName} className="productimg" />
          )}
          <p> {newProductName}</p>
          <p> {newProductPrice}</p>
          <p>{newProductDiscount}</p>
        
        </div>
      )}

      {products.map((item) => (
        <div key={item.id} className="pkey">
          <img src={item.images[0]} alt={item.title} className="productimg" />
          <p className="price">Price ksh {item.price}</p>
          <p className="discount">Discount {item.discountPercentage}%</p>

          <Link to={`/ProductDetails/${item.id}`} className="btn">
            <button type="submit">View details</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Products;
