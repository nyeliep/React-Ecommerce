import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Products from './Products';
import ProductForm from './ProductForm';
import ProductDetails from './ProductDetails';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product-form" element={<ProductForm />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
