import MenuItemList from './components/MenuItemList';
import AboutPage from './pages/AboutPage';
import Cart from './components/Cart';
import ProductPage from './pages/ProductPage';
import MainLayout from './layouts/MainLayout';
import NotFoundPage from './pages/NotFoundPage';

import { Route, Routes } from 'react-router';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />} >
        <Route index element={<MenuItemList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
