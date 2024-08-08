import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Loader from '../components/PizzaBlock/Loader';
import { useContext, useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { useSelector } from 'react-redux';

function Home() {
  const { selectedCategoryIndex, isOrderByDesc, selectedSortItem } = useSelector(
    (state) => state.filter,
  );

  const { searchInput } = useContext(SearchContext);
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const orderByQueryParam = `${isOrderByDesc ? '&order=desc' : ''}`;
  const categoryQueryParam = `${selectedCategoryIndex ? `&category=${selectedCategoryIndex}` : ''}`;
  const searchQueryParam = `${searchInput ? `&search=${searchInput}` : ''}`;

  const url =
    'https://66a7aa6253c13f22a3d0a541.mockapi.io/pizzas' +
    `?limit=4&page=${currentPage + 1}&sortBy=` +
    selectedSortItem.sortKey +
    orderByQueryParam +
    categoryQueryParam +
    searchQueryParam;

  useEffect(() => {
    setIsLoading(true);
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
      })
      .then((items) => {
        setPizzas(items);
        setIsLoading(false);
      })
      .catch(() => {
        setPizzas([]);
        setIsLoading(false);
      });
  }, [selectedSortItem, isOrderByDesc, selectedCategoryIndex, searchInput, currentPage]);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>

      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Loader key={index} />)
          : pizzas.map((pizza, i) => <PizzaBlock key={i} {...pizza} />)}
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>
  );
}

export default Home;
