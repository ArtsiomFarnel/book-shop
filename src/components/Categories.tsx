import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter, setCategoryId } from '../redux/slices/filterSlice';

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories: React.FC = () => {
  const { categoryId } = useSelector(selectFilter);
  const dispatch = useDispatch();

  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((name, index) => (
          <li
            key={index}
            onClick={() => onChangeCategory(index)}
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
