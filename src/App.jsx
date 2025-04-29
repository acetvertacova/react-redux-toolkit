import Menu from './components/Menu';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import NotFoundPage from './pages/NotFoundPage';
import MainLayout from './layouts/MainLayout';
import { Route, Routes } from 'react-router';
import NewMenuItemForm from './components/NewMenuItemForm';
import "./App.css";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />} >
        <Route index element={<Menu />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/create" element={<NewMenuItemForm />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
