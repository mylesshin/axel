import styles from './Banner.module.css';

//display free shipping banner
export const Banner = () => {
  return (
    <div className={styles.banner}>
      <div>Free Shipping on Orders $50+</div>
    </div>
  );
};
