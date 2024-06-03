import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [barcode, setBarcode] = useState('');
  const [category, setCategory] = useState('');
  const [count, setCount] = useState('');
  const [categories, setCategories] = useState([]);

  const navigate=useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:4000/categories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddProduct = async () => {
    if(name==="" || price===""){
      alert("All fields are required")
    }
    try {
      const selectedCategory = categories.find(cat => cat.name === category);
      if (!selectedCategory) {
        throw new Error('Invalid category');
      }

      const response = await fetch('http://localhost:4000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, price, barcode, category: selectedCategory._id, count }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add product');
      }

      alert('Product added successfully');
      navigate(`/products/category/${selectedCategory._id}`)
    } catch (error) {
      console.error('Error adding product:', error);
      alert(`Error adding product: ${error.message}`);
    }
  };

  return (
    <div className="container">
      <h1>Add Product</h1>
      <Form>
        <Form.Group controlId="formProductName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formProductPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter product price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formProductBarcode">
          <Form.Label>Barcode</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product barcode"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formProductCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select category</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formProductCount">
          <Form.Label>Count</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter product count"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleAddProduct}>
          Add
        </Button>
      </Form>
    </div>
  );
};

export default AddProduct;
