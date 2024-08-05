import ReactPagination from 'react-paginate';
import style from './Pagination.module.scss'

const Pagination = ({currentPage, setCurrentPage}) => {
  return (
    <ReactPagination
      className={style.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => setCurrentPage(event.selected)}
      pageRangeDisplayed={4}
      pageCount={3}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
