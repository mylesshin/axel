import PropTypes from 'prop-types';
import styles from './CartProduct.module.css';
import { FaRegTrashCan } from 'react-icons/fa6';
import CartContext from '../../context/CartContext';
import { useContext } from 'react';
import { QuantityDropdown } from '../QuantityDropdown/QuantityDropdown';

// display product info in the cart
export const CartProduct = ({ item }) => {
  const { removeFromCart } = useContext(CartContext);

  return (
    <>
      <div className={styles.full}>
        <div className={styles.left}>
          <div className={styles.info}>
            <img
              className={styles.image}
              src={item.image}
              alt='item image'
            />
            <div className={styles.middle}>
              <div>
                <div className={styles.bold}>{item.title}</div>
                <div>{item.category}</div>
                <div>
                  Quantity:{' '}
                  <QuantityDropdown
                    quantity={item.quantity}
                    item={item}
                  />
                </div>
              </div>
              <div className={styles.trash}>
                <FaRegTrashCan
                  className={styles.trash}
                  onClick={() => removeFromCart(item.id)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.bold}>${item.price}</div>
        </div>
      </div>
    </>
  );
};

CartProduct.propTypes = {
  item: PropTypes.object.isRequired,
};
