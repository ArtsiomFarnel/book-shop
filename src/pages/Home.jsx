import React from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import BookBlock from '../components/BookBlock';

import Skeleton from '../components/BookBlock/Skeleton';
import Pagination from '../components/Pagination';
import { setFilters } from '../redux/slices/filterSlice';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sortType, currentPage, searchValue } = useSelector((state) => state.filter);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

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
      setIsLoading(true);

      const sortBy = sortType.property.replace('-', '');
      const order = sortType.property.includes('-') ? 'asc' : 'desc';
      const search = searchValue ? `${searchValue}` : '';
      const category = categoryId > 0 ? `${categoryId}` : '';

      axios
        .get(
          `https://63ecb1a5be929df00cb0201a.mockapi.io/items?page=${currentPage}&limit=8&sortby=${sortBy}&order=${order}&category=${category}&search=${search}`
        )
        .then((res) => {
          setItems(res.data);
          setIsLoading(false);
        });
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
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => <BookBlock key={obj.id} {...obj} />)}
      </div>
      <Pagination />
    </div>
  );
};

export default Home;
