import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import BookBlock from '../components/BookBlock';

import Skeleton from '../components/BookBlock/Skeleton';
import Pagination from '../components/Pagination';
import { selectBooks } from '../redux/book/selectors';
import { selectFilter } from '../redux/filter/selectors';
import { setFilters } from '../redux/filter/slice';
import { fetchBooks } from '../redux/book/slice';
import { useAppDispatch } from '../redux/store';
import { FilterSliceState } from '../redux/filter/types';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { items, status } = useSelector(selectBooks);
  const { categoryId, sortType, currentPage, searchValue } = useSelector(selectFilter);

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
        } as FilterSliceState)
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
      <h2 className="content__title">Все книги</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка на сервере 😕</h2>
          <p>Попробуйте повторить попытку позже</p>
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
