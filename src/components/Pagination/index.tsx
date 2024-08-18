import ReactPagination from 'react-paginate';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/filterSlice';
import style from './Pagination.module.scss';

type PaginationProps = {
  currentPage: number;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage }) => {
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
      //@ts-ignore
      currentPage={currentPage}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
