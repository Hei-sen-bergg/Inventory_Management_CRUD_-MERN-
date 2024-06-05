import React from 'react';
import { useNavigate } from 'react-router-dom';

const GoBack = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)}>go back</button>
  );
}

export default GoBack;