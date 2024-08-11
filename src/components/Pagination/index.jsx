import ReactPagination from 'react-paginate';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/filterSlice';
import style from './Pagination.module.scss';

const Pagination = ({ currentPage }) => {
  const dispatch = useDispatch();

  return (
    <ReactPagination
      className={style.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => dispatch(setCurrentPage(event.selected))}
      pageRangeDisplayed={4}
      pageCount={3}
      currentPage={currentPage}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
