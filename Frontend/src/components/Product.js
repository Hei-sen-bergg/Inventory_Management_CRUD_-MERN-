import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

const Products = () => {
  const { categoryId } = useParams(); // Use useParams to get categoryId from the route parameters
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (categoryId) {
      fetchProducts();
    }
  }, [categoryId]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`/products/category/${categoryId}`);
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
        await fetch(`/products/${productId}`, {
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
      <h1>Products</h1>
      <Link to="/products">
        <Button variant="primary">Add Product</Button>
      </Link>
      {products.map((product) => (
        <Card key={product._id} className="my-2">
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>Price: {product.price}</Card.Text>
            <Card.Text>Barcode: {product.barcode}</Card.Text>
            <Card.Text>Category: {product.category.name}</Card.Text>
            <Card.Text>Count: {product.count}</Card.Text>
            <Link to="/products/:productId" className="mr-2">
              <Button variant="info">Update</Button>
            </Link>
            <Button variant="danger" onClick={() => handleDelete(product._id)}>
              Delete
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Products;
