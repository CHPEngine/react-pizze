import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Loader from '../components/PizzaBlock/Loader';
import { useEffect, useState } from 'react';

function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOrderByDesc, setIsOrderByDesc] = useState(false);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [sortItem, setSortItem] = useState({
    name: 'популярности',
    sortKey: 'rating',
  });

  const orderByQueryParam = `${isOrderByDesc ? '&order=desc' : ''}`;
  const categoryQueryParam = `${selectedCategoryIndex ? `&category=${selectedCategoryIndex}` : ''}`;

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://66a7aa6253c13f22a3d0a541.mockapi.io/pizzas?sortBy=${sortItem.sortKey}${orderByQueryParam}${categoryQueryParam}`,
    )
      .then((res) => res.json())
      .then((items) => {
        setPizzas(items);
        setIsLoading(false);
      });
  }, [sortItem, isOrderByDesc, selectedCategoryIndex]);
  window.scrollTo(0, 0);

  return (
    <>
      <div className="content__top">
        <Categories
          selectedCategoryIndex={selectedCategoryIndex}
          setSelectedCategoryIndex={setSelectedCategoryIndex}
        />
        <Sort
          isOrderByDesc={isOrderByDesc}
          setIsOrderByDesc={setIsOrderByDesc}
          selectedSortItem={sortItem}
          onClickSortItem={(item) => setSortItem(item)}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>

      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Loader key={index} />)
          : pizzas.map((pizza, i) => <PizzaBlock key={i} {...pizza} />)}
      </div>
    </>
  );
}

export default Home;
