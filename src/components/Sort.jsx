import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSortType } from '../redux/slices/filterSlice';

export const sortList = [
  { name: 'популярности по убыванию', property: 'rating' },
  { name: 'популярности по возрастанию', property: '-rating' },
  { name: 'цене по убыванию', property: 'price' },
  { name: 'цене по возрастанию', property: '-price' },
  { name: 'алфавиту по убыванию', property: 'title' },
  { name: 'алфавиту по возрастанию', property: '-title' }
];

function Sort() {
  const dispatch = useDispatch();
  const sortType = useSelector((state) => state.filter.sortType);
  const sortRef = React.useRef();

  const [open, setOpen] = React.useState(false);

  const onClickListItem = (obj) => {
    dispatch(setSortType(obj));
    setOpen(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    //unmount
    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{sortType.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {sortList.map((value, index) => (
              <li
                key={index}
                onClick={() => onClickListItem(value)}
                className={sortType.property === value.property ? 'active' : ''}
              >
                {value.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
