import './App.css';
import { Home } from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ItemOverview } from './pages/ItemOverview/ItemOverview';
import { Cart } from './pages/Cart/Cart';
import { NoPage } from './pages/NoPage';
import { CartProvider } from './context/CartContext';

// to do:
// make the banner say 10 quantity is max for one item
// add comments and clean up code

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={<Home />}
          />
          <Route
            path='itemOverview/:id'
            element={<ItemOverview />}
          />
          <Route
            path='cart'
            element={<Cart />}
          />
          <Route
            path='*'
            element={<NoPage />}
          />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
