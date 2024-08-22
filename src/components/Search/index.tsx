import style from './Search.module.scss';
import { useState, useRef, useCallback, ChangeEvent } from 'react';
import _debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import { setSearchInput } from '../../redux/slices/filter/slices';

const Serach: React.FC = () => {
  const [searchDisplayedValue, setSearchDisplayedValue] = useState('');
  const [isFilledInput, setIsFilledInput] = useState(false);
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const searchCallback = useCallback(
    _debounce((str: string) => dispatch(setSearchInput(str)), 550),
    [],
  );

  const onChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchDisplayedValue(e.target.value);
    setIsFilledInput(true);
    searchCallback(e.target.value);
  };

  const onClickClearInput = () => {
    setIsFilledInput(false);
    setSearchDisplayedValue('');
    dispatch(setSearchInput(''));
    inputRef.current?.focus();
  };

  return (
    <div className={style.root}>
      <svg
        className={style.icon}
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="100"
        height="100"
        viewBox="0 0 50 50"
      >
        <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
      </svg>
      <input
        ref={inputRef}
        className={style.input}
        value={searchDisplayedValue}
        onChange={onChangeInputValue}
        placeholder="Поиск пиццы..."
      />
      {isFilledInput && (
        <svg
          className={style.clearInput}
          onClick={onClickClearInput}
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="100"
          height="100"
          viewBox="0 0 24 24"
        >
          <path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"></path>
        </svg>
      )}
    </div>
  );
};

export default Serach;
