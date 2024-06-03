import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import './Categories.css'

const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:4000/categories');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleDelete = async (categoryId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this category?');
    if (confirmDelete) {
      try {
        await fetch(`http://localhost:4000/categories/${categoryId}`, {
          method: 'DELETE',
        });
        fetchCategories();
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  return (
    <div className="container">
      <div className='row'>
      <div className="col-md-8  mt-3" > {/* Use Bootstrap's grid system to allocate 2/3 of the container width */}
      <h3>Welcome to Upstocks,</h3>
      <p>your platform for managing, updating, and removing categories and products.</p>
    </div>
      <div className='col-md-4 d-flex justify-content-end'>  
      <DropdownButton title="Click to add" id="bg-nested-dropdown"   className=" mt-3" // Apply Bootstrap size class
      style={{ width: 'auto', display: 'inline-block' }}>
        <Dropdown.Item eventKey="1"><Link to="/add-category">
        <Button variant="primary">Add Category</Button>
      </Link></Dropdown.Item>
        <Dropdown.Item eventKey="2"><Link to="/products">
        <Button variant="primary">Add Product</Button>
      </Link></Dropdown.Item>
      </DropdownButton>
      </div>
      </div>

      
      <Row xs={1} md={3} className="g-4">
        {categories.map((category) => (
          <Col key={category._id}>
            <Card className='fixed-card'>
              <Card.Img variant="top" src={`http://localhost:4000${category.image}`} alt={category.name} />
              <Card.Body className="text-center">
              <Link to={`/products/category/${category._id}`} style={{ fontWeight: 'bold' , textDecoration:'none'}}>
                  {category.name}
                </Link>
                <Card.Text>{category.description}</Card.Text>
                <Link to={`/update-category/${category._id}`} className="mr-2">
                  <Button variant="warning" className='mb-3'>Edit</Button>
                </Link>
                <Button variant="danger" onClick={() => handleDelete(category._id)} className="ml-2">
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Category;
