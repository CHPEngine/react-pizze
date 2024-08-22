import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Loader from '../components/PizzaBlock/Loader';
import { useCallback, useEffect } from 'react';
import Pagination from '../components/Pagination';
import { useSelector } from 'react-redux';
import { fetchPizzas } from '../redux/slices/pizza/slices';
import { useAppDispatch } from '../redux/store';
import { selectFilter } from '../redux/slices/filter/selectors';
import { selectPizzas } from '../redux/slices/pizza/selectors';
import { selectCategory } from '../redux/slices/filter/slices';

function Home() {
  const { selectedCategoryIndex, searchInput, isOrderByDesc, selectedSortItem, currentPage } =
    useSelector(selectFilter);
  const { items, fetchStatus } = useSelector(selectPizzas);
  const dispatch = useAppDispatch();

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
  const pizzas = items.map((pizza: any, i: number) => <PizzaBlock key={i} {...pizza} />);

  const onClickCategory = useCallback((index: number) => {
    dispatch(selectCategory(index));
  }, []);

  return (
    <>
      <div className="content__top">
        <Categories
          selectedCategoryIndex={selectedCategoryIndex}
          onClickCategory={onClickCategory}
        />
        <Sort isOrderByDesc={isOrderByDesc} selectedSortItem={selectedSortItem} />
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
