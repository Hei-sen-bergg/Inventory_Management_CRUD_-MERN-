import React from 'react';
import { Button } from 'react-bootstrap';

const DeleteProduct = ({ productId, fetchProducts }) => {
  const handleDeleteProduct = async () => {
    try {
      await fetch(`/products/${productId}`, {
        method: 'DELETE',
      });
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <Button variant="danger" onClick={handleDeleteProduct}>
        Delete
      </Button>
    </div>
  );
};

export default DeleteProduct;
