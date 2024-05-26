import React from 'react'
import  Products  from '../components/Product';
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom';

const Product = () => {

  const { categoryId } = useParams();

  return (
    <div>
     <Navbar/>
     <h1>Product Management</h1>
      <Products categoryId={categoryId}/>
    </div>
  )
}

export default Product
