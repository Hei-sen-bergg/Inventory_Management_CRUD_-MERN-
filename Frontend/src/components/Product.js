import React, { useState, useEffect } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "./Product.css";

const Products = () => {
  const { categoryId } = useParams(); // Use useParams to get categoryId from the route parameters
  const [categoryName, setCategoryName] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (categoryId) {
      fetchCategoryName();
      fetchProducts();
    }
  }, [categoryId]);

  const fetchCategoryName = async () => {
    try {
      const response = await fetch(`http://localhost:4000/categories/${categoryId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCategoryName(data.name);
    } catch (error) {
      console.error('Error fetching category name:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(`http://localhost:4000/products/category/${categoryId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (confirmDelete) {
      try {
        await fetch(`http://localhost:4000/products/${productId}`, {
          method: "DELETE",
        });
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <div className="container">
      
      <div className='row'>
      <div className="col-md-8  mt-3" > {/* Use Bootstrap's grid system to allocate 2/3 of the container width */}
      <h3 >Here is the list of all products in this category "{categoryName}"</h3>
    </div>
      <div className='col-md-4 d-flex justify-content-end'>  
      <Link to="/products" className="ml-auto d-flex justify-content-end">
      <Button style={{height: '40px', marginTop: '15px'}} variant="primary">Add Product</Button>
    </Link>
      </div>
      </div>
      
      <Row xs={1} md={3} className="g-4 mt-1">
        {products.map((product) => (
          <Col key={product._id}>
            <Card className="fixed-card">
              <Card.Img variant="top" src={`http://localhost:4000${product.image}`} alt={product.name} />
              <Card.Body className="text-center">
                <Card.Title className="fw-bold">{product.name}</Card.Title>
                <Card.Text style={{marginBottom: '5px'}}>Price: {product.price}</Card.Text>
                <Card.Text style={{marginBottom: '5px'}}>Barcode: {product.barcode}</Card.Text>
                <Card.Text style={{marginBottom: '5px'}}>Category: {product.category.name}</Card.Text>
                <Card.Text style={{marginBottom: '5px'}}>Count: {product.count}</Card.Text>
                <Link to={`/products/${product._id}`} className="mr-2">
                  <Button variant="warning" className="mb-3">Edit</Button>
                </Link>
                <Button variant="danger" onClick={() => handleDelete(product._id)} className="ml-2">
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

export default Products;
