import './scss/app.scss';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import { Routes, Route } from 'react-router-dom';
import PizzaCart from './components/PIzzaCart';
import MainWrapper from './components/MainWrapper';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainWrapper />}>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pizza/:id" element={<PizzaCart />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
