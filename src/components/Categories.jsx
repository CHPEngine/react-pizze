import { useSelector, useDispatch } from 'react-redux';
import { selectCategory } from '../redux/slices/filterSlice';

function Categories() {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  const { selectedCategoryIndex } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => {
          return (
            <li
              key={index}
              onClick={() => dispatch(selectCategory(index))}
              className={selectedCategoryIndex == index ? 'active' : ''}
            >
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
