import Menu from './components/Menu';
import AboutPage from './pages/AboutPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import NotFoundPage from './pages/NotFoundPage';
import MainLayout from './layouts/MainLayout';
import { Route, Routes } from 'react-router';
import NewMenuItemForm from './components/NewMenuItemForm';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />} >
        <Route index element={<Menu />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/create" element={<NewMenuItemForm />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
