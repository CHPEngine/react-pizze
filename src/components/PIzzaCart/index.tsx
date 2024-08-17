import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PizzaCart: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();

  const re = {};
  useEffect(() => {
    async function getPizzaById() {
      try {
        setPizza(
          await (
            await axios.get(`https://66a7aa6253c13f22a3d0a541.mockapi.io/pizzas/${id}`)
          ).data,
        );
      } catch (error) {
        alert('Не удалось получить пиццу');
        navigate('/');
      }
    }
    getPizzaById();
  }, []);

  if (!pizza) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="content">
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>
    </div>
  );
};

export default PizzaCart;
