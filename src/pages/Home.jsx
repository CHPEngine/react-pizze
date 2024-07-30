import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Loader from '../components/PizzaBlock/Loader';
import { useEffect, useState } from 'react';

function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://66a7aa6253c13f22a3d0a541.mockapi.io/pizzas')
      .then((res) => res.json())
      .then((items) => {
        setPizzas(items);
        setIsLoading(false);
      });
  }, []);

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
    </>
  );
}

export default Home;
