import React, { useContext, useState } from 'react';
import CartContext from '../../context/CartContext';


// quantity dropdown in cart for each item
export const QuantityDropdown = ({quantity, item}) => {
    const [selectedValue, setSelectedValue] = useState(quantity);
    const { updateQuantity } = useContext(CartContext);

    //update quantity
    const handleChange = (event) => { 
        setSelectedValue(event.target.value); 
        updateQuantity([item], Number(event.target.value));

      }; 
      return ( 
        <>
        <select value={selectedValue} onChange={handleChange}> 
            {[...Array(10).keys()].map((num) => (
          <option key={num + 1} value={num + 1}>
            {num + 1}
          </option>
            ))}
        </select> 
        </>
      ); 
}