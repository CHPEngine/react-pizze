import { useEffect, useState, useRef, memo } from 'react';
import { setIsOrderByDesc, setSelectedSortItem } from '../redux/slices/filter/slices';
import { SortItem, SortKeys, SortNames } from '../redux/slices/filter/types';
import { useAppDispatch } from '../redux/store';

export const sortItemList = [
  { name: SortNames.POPULAR, sortKey: SortKeys.POPULAR },
  { name: SortNames.PRICE, sortKey: SortKeys.PRICE },
  { name: SortNames.ALPHABET, sortKey: SortKeys.ALPHABET },
];

interface SortProps {
  isOrderByDesc: boolean;
  selectedSortItem: SortItem;
}

const Sort: React.FC<SortProps> = memo(({ isOrderByDesc, selectedSortItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const hadleClickOutside = (event: MouseEvent) => {
    if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener('click', hadleClickOutside);

    return () => document.body.removeEventListener('click', hadleClickOutside);
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => dispatch(setIsOrderByDesc(!isOrderByDesc))}
          className={isOrderByDesc ? 'sort__desc' : ''}
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsOpen(!isOpen)}>{selectedSortItem.name}</span>
      </div>
      {isOpen && (
        <div className="sort__popup">
          <ul>
            {sortItemList.map((sortItem, sortIndex) => (
              <li
                key={sortIndex}
                onClick={() => {
                  dispatch(setSelectedSortItem(sortItem));
                  setIsOpen(!isOpen);
                  dispatch(setIsOrderByDesc(false));
                }}
                className={sortItem.sortKey == selectedSortItem.sortKey ? 'active' : ''}
              >
                {sortItem.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default Sort;
