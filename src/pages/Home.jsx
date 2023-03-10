import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import BookBlock from '../components/BookBlock';

import Skeleton from '../components/BookBlock/Skeleton';
import Pagination from '../components/Pagination';
import { setFilters } from '../redux/slices/filterSlice';
import { fetchBooks } from '../redux/slices/booksSlice';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { items, status } = useSelector((state) => state.books);
  const { categoryId, sortType, currentPage, searchValue } = useSelector((state) => state.filter);

  React.useEffect(() => {
    if (isMounted.current) {
      const querryString = qs.stringify({
        sortProperty: sortType.property,
        categoryId,
        currentPage,
        searchValue
      });
      navigate(`?${querryString}`);
    }
    isMounted.current = true;
  }, [searchValue, categoryId, sortType, currentPage]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sortType = sortList.find((obj) => obj.property === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sortType
        })
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (!isSearch.current) {
      const sortBy = sortType.property.replace('-', '');
      const order = sortType.property.includes('-') ? 'asc' : 'desc';
      const search = searchValue ? `${searchValue}` : '';
      const category = categoryId > 0 ? `${categoryId}` : '';

      dispatch(fetchBooks({ currentPage, sortBy, order, category, search }));
    }
    isSearch.current = false;

    window.scrollTo(0, 0);
  }, [searchValue, categoryId, sortType, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">?????? ??????????</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>?????????????????? ???????????? ???? ?????????????? ????</h2>
          <p>???????????????????? ?????????????????? ?????????????? ??????????</p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading'
            ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
            : items.map((obj) => <BookBlock key={obj.id} {...obj} />)}
        </div>
      )}
      <Pagination />
    </div>
  );
};

export default Home;
