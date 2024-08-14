import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Loader from '../components/PizzaBlock/Loader';
import { useContext, useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

function Home() {
  const { selectedCategoryIndex, isOrderByDesc, selectedSortItem, currentPage } = useSelector(
    (state) => state.filter,
  );
  const { items, fetchStatus } = useSelector((state) => state.pizza);
  const dispatch = useDispatch();

  const { searchInput } = useContext(SearchContext);

  useEffect(() => {
    dispatch(
      fetchPizzas({
        isOrderByDesc,
        selectedCategoryIndex,
        searchInput,
        currentPage,
        selectedSortItem,
      }),
    );
  }, [selectedSortItem, isOrderByDesc, selectedCategoryIndex, searchInput, currentPage]);

  const loadingBlock = [...new Array(6)].map((_, index) => <Loader key={index} />);
  const pizzas = items.map((pizza, i) => <PizzaBlock key={i} {...pizza} />);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>

      {fetchStatus == 'failed' ? (
        <h1>Выдачи нет 😕</h1>
      ) : (
        <div className="content__items">{fetchStatus === 'loading' ? loadingBlock : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} />
    </>
  );
}

export default Home;
