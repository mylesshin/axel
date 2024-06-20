import { useEffect, useState } from 'react';
import { Card } from '../Card/Card';
import styles from './Items.module.css';

//fetch all product info from api
export const Items = () => {
  const [products, setProducts] = useState([]);
  //fetch all product info
  useEffect(() => {
    const getItems = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        throw new Error('Failed to fetch products', error);
      }
    };
    getItems();
  }, []);

  return (
    <>
      <div className={styles.items}>
        <div className={styles.cardsContainer}>
          {products ? (
            products.map((item, index) => (
              <Card
                className={styles.item}
                key={index}
                productInfo={item}
              />
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </>
  );
};
