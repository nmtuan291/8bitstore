import { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import HomePage from './pages/Home/';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ProductSection from './pages/Product/ProductSection/ProductSection';
import LatestProduct from './pages/Home/LatestProduct/LatestProduct';

function App() {

  return (
    <>  
      <HomePage />
      <LatestProduct />
      <LatestProduct />
    </>
  )
}

export default App
