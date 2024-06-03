import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

const AddCategoryPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleAddCategory = async () => {
    try {
      if (name === '' || description === '') {
        alert('Please enter category name and description');
        return;
      }

      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      if (image) formData.append('image', image);

      const response = await fetch('http://localhost:4000/categories', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to add category');
      }

      navigate('/home');
    } catch (error) {
      console.error('Error adding category:', error);
      alert('Error adding category');
    }
  };

  return (
    <div className="container">
      <h1>Add Category</h1>
      <Form>
        <Form.Group controlId="formCategoryName">
          <Form.Label>Category Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formCategoryDescription">
          <Form.Label>Category Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formCategoryImage">
          <Form.Label>Category Image</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleAddCategory}>
          Add
        </Button>
      </Form>
    </div>
  );
};

export default AddCategoryPage;
