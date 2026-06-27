import axios from 'axios';
import { Routes, Route } from 'react-router';
import { useEffect, useState } from 'react';
import HomePage from './pages/HomePage';
import CheckoutPage from './pages/checkout/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import TrackingPage from './pages/TrackingPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css'

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    ;(async () => {
      const response = await axios.get('/api/cart-items?expand=product')
      setCart(response.data);
    })();                               // IIFE  --> (...)()
  }, [])
  return (
    <Routes>
      {/* <Route path='/' element={<HomePage />} /> */}
      <Route index element={<HomePage cart={cart} />} />
      <Route path='checkout' element={<CheckoutPage cart={cart} />} />
      <Route path='orders' element={<OrdersPage cart={cart} />} />
      <Route path='tracking/:orderId/:productId' element={<TrackingPage cart={cart} />} />
      <Route path='*' element={<NotFoundPage cart={cart} />} />
    </Routes>
    
  )
}

export default App
