import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from '../redux/filter/selectors';
import { setCategoryId } from '../redux/filter/slice';

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories: React.FC = () => {
  const { categoryId } = useSelector(selectFilter);
  const dispatch = useDispatch();

  return (
    <div className="categories">
      <ul>
        {categories.map((name, index) => (
          <li
            key={index}
            onClick={() => dispatch(setCategoryId(index))}
            className={categoryId === index ? 'active' : ''}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
