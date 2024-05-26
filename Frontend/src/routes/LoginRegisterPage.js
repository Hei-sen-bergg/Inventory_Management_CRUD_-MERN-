import React, { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';

const LoginRegisterPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      {isLogin ? <Login /> : <Register />}
      <button onClick={handleToggle}>
        {isLogin ? 'Register' : 'Login'}
      </button>
    </div>
  );
};

export default LoginRegisterPage;
