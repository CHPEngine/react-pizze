import './scss/app.scss';
import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import { Routes, Route } from 'react-router-dom';
import { createContext, useState } from 'react';

export const SearchContext = createContext('');

function App() {
  const [searchInput, setSearchInput] = useState('');

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchInput, setSearchInput }}>
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
