import Header from '../components/Header';
import ProductGrid from '../components/ProductGrid';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './HomePage.css';

export default function HomePage({ cart, getCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    ;(async () => {
      const response = await axios.get('/api/products')
      setProducts(response.data);
    })();
  }, []);

  return (
    <>
      <title>Ecommerce Project</title>
      <link rel="icon" type="image/svg+xml" href="favicons/home-favicon.png" />

      <Header cart={cart} />

      <div className="home-page">
        <div className="products-grid">
          {products.map((product) => {
            return (
              <ProductGrid key={product.id} product={product} getCart={getCart} />
            );
          })}
        </div>
      </div>
    </>
  );
}