import React, { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';

const LoginRegisterPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className='text-center'  style={{backgroundColor: '#F1FAFF',margin: 0, padding: 0, height: '100vh', width: '100vw', borderRadius:'20px'}}>

      <h3 className='text-center' style={{margin:0,padding:0}}>Welcome to Upstocks</h3>
      <h6 className='mb-4 mt-2'>Hey there...</h6>
      {isLogin ? <Login /> : <Register />}
      <a onClick={handleToggle} className='mt-5 fw-bold'>
     {isLogin ? 'If you are a new user, click here to register !' : 'If you are an existing user, click here to login !'}
      </a>
    </div>
  );      
};

export default LoginRegisterPage;
