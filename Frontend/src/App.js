import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginRegisterPage from './routes/LoginRegisterPage';
import Home from './routes/Home';
import Product from './routes/Product';
import AddProduct from './components/AddProduct';
import AddCategoryPage from './components/AddCategory';
import UpdateCategoryPage from './components/UpdateCategory';
import UpdateProduct from './components/UpdateProduct';
import AdminProfile from './components/AdminProfile';

  
  function App(fetchProducts) {
    
    return (
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LoginRegisterPage />} />
            <Route path="/home" element={<Home/>} />
            <Route path="/add-category" element={<AddCategoryPage />} />
            <Route path="/update-category/:categoryId" element={<UpdateCategoryPage />} />
            <Route path="/products/category/:categoryId" element={<Product />} />
            <Route path="/products" element={<AddProduct fetchProducts={fetchProducts}/>} />
            <Route path="/products/:productId" element={<UpdateProduct />} />
            <Route path="/admin/profile" element={<AdminProfile/>} />

            
          </Routes>
        </div>
      </Router>
    );
  }


export default App;
