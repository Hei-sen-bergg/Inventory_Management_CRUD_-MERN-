import React, { useState, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/categories');
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
        await fetch(`/categories/${categoryId}`, {
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
      <h1>Categories</h1>
      <Link to="/add-category">
        <Button variant="primary">Add Category</Button>
      </Link>
      <Link to="/products">
        <Button variant="primary">Add Product</Button>
      </Link>
      {categories.map((category) => (
        <div key={category._id}>
          <Card className="my-2">
            <Card.Body>
            <Link to={`/products/category/${category._id}`}>
                {category.name}
              </Link>
              <Card.Text>{category.description}</Card.Text>
              <Link to={`/update-category/${category._id}`} className="mr-2">
                <Button variant="warning">Edit</Button>
              </Link>
              <Button
                variant="danger"
                onClick={() => handleDelete(category._id)}
                className="ml-2"
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Category;
