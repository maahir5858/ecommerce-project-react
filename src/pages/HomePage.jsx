import Header from '../components/Header';
import ProductGrid from '../components/ProductGrid';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import axios from 'axios';
import './HomePage.css';

export default function HomePage({ cart, getCart }) {
  const [products, setProducts] = useState([]);

  const [searchParams] = useSearchParams();
  const searchText = searchParams.get('search');  

  useEffect(() => {
    ;(async () => {
      const urlPath = searchText ? `/api/products?search=${searchText}` : '/api/products';
      const response = await axios.get(urlPath);
      setProducts(response.data);
    })();
  }, [searchText]);

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