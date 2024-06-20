import { createContext, useState } from 'react';
import PropTypes from 'prop-types';


//context created to update items in cart
const CartContext = createContext({
  // key: item id, value: item object
  cartItems: new Map(),
  updateQuantity: (_itemToAdd, _itemQuantity = 0) => {},
  removeFromCart: () => {},
});
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(new Map());

  // update quantity of item
  const updateQuantity = (itemToAdd, itemQuantity = 0) => {
    setCartItems((prevItems) => {
      const itemId = itemToAdd[0].id;
      const newItems = new Map(prevItems);

      if (newItems.has(itemId)) {
        let currentItem = newItems.get(itemId);
        //if just adding an additonal quantity of the item from itemOveriew
        if (itemQuantity === 0) {
          newItems.set(itemId, {
            ...currentItem,
            quantity: Math.min(currentItem.quantity + 1, 10),
          });
        }
        //altering quantity in cartProduct
        else {
          newItems.set(itemId, {
            ...currentItem,
            quantity: itemQuantity,
          });
        }
      } else {
        newItems.set(itemId, { ...itemToAdd[0], quantity: 1 });
      }

      return newItems;
    });
  };

  // remove item from cart completely
  const removeFromCart = (id) => {
    setCartItems((prevItems) => {
      const newItems = new Map(prevItems);
      newItems.delete(id);
      return newItems;
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartContext;
