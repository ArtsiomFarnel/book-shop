import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';
import { selectFilter } from '../../redux/filter/selectors';
import { setCurrentPage } from '../../redux/filter/slice';

const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  const { currentPage } = useSelector(selectFilter);

  return (
    <ReactPaginate
      className={styles.root}
      previousLabel="<"
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => dispatch(setCurrentPage(event.selected + 1))}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
    />
  );
};

export default Pagination;
