import { MdOutlineShoppingCart } from 'react-icons/md';
import { FaShop } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

import styles from './Header.module.css';
import { useContext } from 'react';
import CartContext from '../../context/CartContext';

// display the header on all pages
export const Header = () => {
  const { cartItems } = useContext(CartContext);
  //to calculate all quantity of items for the red icon above the cart
  const cartCount = ((cartItems) => {
    let count = 0;
    for (const [_, value] of cartItems) {
      count += value.quantity;
    }
    return count;
  })(cartItems);
  return (
    <>
      <div id={styles.nav}>
        <Link
          className={`${styles.name} ${styles.products} ${styles.button}`}
          to='/'
        >
          <div>Axel</div>
          <FaShop />
        </Link>
        <div className={styles.right}>
          <div>
            <Link
              className={`${styles.products} ${styles.button}`}
              to='/'
            >
              Products
            </Link>
          </div>
          <div className={styles.cart}>
            <Link
              className={styles.button}
              to='/cart'
            >
              <MdOutlineShoppingCart className={styles.shoppingCart} />
              {cartCount > 0 && (
                <div className={styles.bubble}>{cartCount}</div>
              )}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
