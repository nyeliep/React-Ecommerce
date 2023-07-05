import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

const Products =()=>{
  const [products, setProducts] = useState([]);

  const [loading,setLoading] = useState(false);

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

console.log({products});
  if(loading){
    return <h2>loading...</h2>
  }
  return(
    <div className="product">
      {products.map((item)=>(
        <div key={item.id} className="pkey">
         <img src={item.images[0]} alt={item.title} className="productimg" />
          <p className="price">price ksh {item.price}</p>
          <p className="discount">discount {item.discountPercentage}%</p>

          <Link to={`/ProductDetails/${item.id}` }className="btn">
            <button type="submit">View details</button>
          </Link>
          </div>
      ))}
   
    </div>
  );
};

export default Products