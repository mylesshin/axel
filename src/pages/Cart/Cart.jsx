import { Header } from '../../components/Header/Header';
import styles from './Cart.module.css';
import CartContext from '../../context/CartContext';
import { useContext } from 'react';
import { CartProduct } from '../../components/CartProduct/CartProduct';

// the entire cart page
export const Cart = () => {
  const { cartItems } = useContext(CartContext);
  const subTotal = ((items) => {
    let currentTotal = 0.0;
    for (const [_, value] of items) {
      const itemTotal = value.price * value.quantity;
      currentTotal += itemTotal;
    }
    return currentTotal.toFixed(2);
  })(cartItems);
  let shipping = (0).toFixed(2);
  if (subTotal < 50 && cartItems.size > 0) {
    shipping = 9.99;
  }
  const tax = (subTotal * 0.095).toFixed(2);
  return (
    <>
      <Header />
      <div className={styles.parent}>
        <div className={styles.flex}>
          <div className={styles.leftSide}>
            <div className={styles.freeShipping}>
              Orders of $50+ Get Free Shipping
            </div>
            <div className={styles.bag}>Bag</div>
            {[...cartItems.values()].map((item) => {
              return (
                <CartProduct
                  key={item.id}
                  item={item}
                />
              );
            })}
          </div>
          <div className={styles.rightSide}>
            <div className={styles.summary}>Summary</div>
            <div className={styles.lineItem}>
              <div className={styles.subtotal}>Subtotal</div>
              <div className={styles.number}>
                {subTotal === '0.00' ? '━' : '$' + subTotal}
              </div>
            </div>
            <div className={styles.lineItem}>
              <div className={styles.shipping}>
                Estimated Shipping & Handling
              </div>
              <div className={styles.number}>{shipping === '0.00' ? 'Free' : '$' + shipping}</div>
            </div>
            <div className={styles.lineItem}>
              <div className={styles.tax}>Estimated Tax</div>
              <div className={styles.number}>{subTotal === '0.00' ? '━' : '$' + tax}</div>
            </div>
            <hr className={styles.hr} />
            <div className={styles.lineItem}>
              <div className={styles.total}>Total</div>
              <div className={styles.number}>
                
                {subTotal === '0.00' ? '━' : '$' + (
                  parseFloat(subTotal) +
                  parseFloat(shipping) +
                  parseFloat(tax)
                ).toFixed(2)}
              </div>
            </div>
            <hr className={styles.hr} />
            <div className={styles.buttons}>
              <div className={styles.checkout}>Checkout</div>
              <div className={`${styles.checkout} ${styles.grey}`}>
                <img
                  src='paypalLogo.png'
                  alt='paypal logo'
                  className={styles.image}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
