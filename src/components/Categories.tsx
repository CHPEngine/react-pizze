import { memo } from 'react';

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

interface CategoriesProps {
  selectedCategoryIndex: number;
  onClickCategory: (index: number) => void;
}

const Categories: React.FC<CategoriesProps> = memo(({ selectedCategoryIndex, onClickCategory }) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => {
          return (
            <li
              key={index}
              onClick={() => onClickCategory(index)}
              className={selectedCategoryIndex == index ? 'active' : ''}
            >
              {category}
            </li>
          );
        })}
      </ul>
    </div>
  );
});

export default Categories;
