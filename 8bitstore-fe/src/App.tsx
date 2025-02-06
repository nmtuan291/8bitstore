import { useState } from 'react';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import ProductPurchase from './components/ProductPurchase/ProductPurchase';
import LoginForm from './components/LoginForm/LoginForm';
import HomePage from './pages/HomePage/HomePage';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ProductSection from './components/ProductSection/ProductSection';

function App() {

  return (
    <> 
      <LoginForm></LoginForm>
      <HomePage></HomePage>

    </>
  )
}

export default App
