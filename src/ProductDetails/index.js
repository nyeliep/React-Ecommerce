import React, { useState, useEffect } from "react";
import './style.css'
import { Link, useParams } from "react-router-dom";

const ProductDetails = () => {
  const { productId } = useParams(); 

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/products/${productId}`);
        const result = await response.json();
        setProduct(result);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    getProduct();
  }, [productId]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!product) {
    return <h2>Product not found.</h2>;
  }

  return (
    <div className="product-details">
      <img src={product.images[0]} alt={product.title} className="productimg" />
      <p className="price">Price ksh {product.price}</p>
      <p className="discount">Discount {product.discountPercentage}%</p>
      <p className="description">{product.description}</p>
      <Link to="/" className="btn">
        <button>Back to Products</button>
      </Link>
    </div>
  );
};

export default ProductDetails;
