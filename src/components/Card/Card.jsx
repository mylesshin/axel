import { Link } from 'react-router-dom';
import { capitalizeCategory, fixTitle } from '../../utils';
import styles from './Card.module.css';

// display product info on homepage
export const Card = (productInfo) => {
  //round price to two decimals
  const roundedPrice = Math.round(productInfo.productInfo.price);

  const updatedCategory = capitalizeCategory(productInfo.productInfo.category);
  const updatedTitle = fixTitle(productInfo.productInfo.title);

  return (
    <>
      <Link
        className={styles.product}
        to={`/itemOverview/${productInfo.productInfo.id}`}
      >
        <div className={styles.info}>
          <div className={styles.image}>
            <img src={productInfo.productInfo.image}></img>
          </div>
          <div className={styles.text}>
            <div id={styles.productTitle}>{updatedTitle}</div>
            <div id={styles.productCategory}>{updatedCategory}</div>
            <div id={styles.productPrice}>${roundedPrice}</div>
          </div>
        </div>
      </Link>
    </>
  );
};