
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ShoppingCartPage from './pages/ShoppingCartPage';
import TodoPage from './pages/TodoPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/cart" />} />
        <Route path="cart" element={<ShoppingCartPage />} />
        <Route path="todos" element={<TodoPage />} />
      </Route>
    </Routes>
  );
}

export default App;
