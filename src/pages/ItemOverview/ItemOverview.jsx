import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header/Header';
import { capitalizeCategory, fixTitle } from '../../utils';
import styles from './ItemOverview.module.css';
import { useContext } from 'react';
import CartContext from '../../context/CartContext';
import { FaX } from 'react-icons/fa6';

//overview page for the item when you click on it
export const ItemOverview = () => {
  const { id } = useParams();
  const [item, setItem] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const { cartItems, updateQuantity } = useContext(CartContext);

  useEffect(() => {
    const fetchItem = async (id) => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const updatedCategory = capitalizeCategory(data.category);
        const updatedTitle = fixTitle(data.title);

        const updatedData = {
          ...data,
          category: updatedCategory,
          title: updatedTitle,
          price: Number(data.price).toFixed(2),
        };
        setItem([updatedData]);
      } catch (error) {
        throw new Error('Failed to fetch product', error);
      }
    };

    fetchItem(id);
  }, [id]);
  console.log(item[0], cartItems.has(item[0]));

  return (
    <>
      <Header />
      {item.length > 0 && (
        <div className={styles.parent}>
          <div className={styles.overview}>
            {previewOpen && item[0] ? (
              cartItems.has(item[0].id) &&
              cartItems.get(item[0].id).quantity < 10 ? (
                <div className={styles.addedToCart}>
                  <div>Added to Cart</div>
                  <div
                    className={styles.x}
                    onClick={() => setPreviewOpen(false)}
                  >
                    <FaX />
                  </div>
                  <div className={styles.addedInfo}>
                    <div className={styles.leftSide}>
                      <img
                        src={item[0].image}
                        alt='product image'
                        className={styles.smallImage}
                      />
                    </div>
                    <div className={styles.rightSide}>
                      <div>${item[0].price}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={styles.addedToCart}>
                  <div className={styles.maxQ}>
                    Max Quantity <br /> (10) Reached
                  </div>
                  <div
                    className={styles.x}
                    onClick={() => setPreviewOpen(false)}
                  >
                    <FaX />
                  </div>
                </div>
              )
            ) : null}

            <div className={`${styles.productPhoto} ${styles.leftSide}`}>
              <img
                src={item[0].image}
                alt='product image'
                className={styles.image}
              />
            </div>
            <div className={styles.rightSide}>
              <div className={styles.textContainer}>
                <div className={styles.productTitle}>{item[0].title}</div>
                <div className={styles.productCategory}>{item[0].category}</div>
                <div className={styles.productPrice}>${item[0].price}</div>
              </div>
              <button
                className={styles.updateQuantity}
                onClick={() => {
                  updateQuantity(item);
                  setPreviewOpen(true);
                }}
              >
                Add To Cart
              </button>
              <div className={styles.textContainer}>
                <div className={styles.productDescription}>
                  {item[0].description}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
