import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';
import { setCurrentPage } from '../../redux/slices/filterSlice';

function Pagination() {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.filter.currentPage);

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  return (
    <ReactPaginate
      className={styles.root}
      previousLabel="<"
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
      renderOnZeroPageCount={null}
    />
  );
}

export default Pagination;
