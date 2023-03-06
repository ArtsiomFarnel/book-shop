import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilter } from '../redux/filter/selectors';
import { setSortType } from '../redux/filter/slice';
import { SortPropertyEnum, SortType } from '../redux/filter/types';

export const sortList: SortType[] = [
  { name: 'популярности по убыванию', property: SortPropertyEnum.RATING_DESC },
  { name: 'популярности по возрастанию', property: SortPropertyEnum.RATING_ASC },
  { name: 'цене по убыванию', property: SortPropertyEnum.PRICE_DESC },
  { name: 'цене по возрастанию', property: SortPropertyEnum.PRICE_ASC },
  { name: 'алфавиту по убыванию', property: SortPropertyEnum.TITLE_DESC },
  { name: 'алфавиту по возрастанию', property: SortPropertyEnum.TITLE_ASC }
];

const Sort: React.FC = () => {
  const dispatch = useDispatch();
  const { sortType } = useSelector(selectFilter);
  const sortRef = React.useRef<HTMLDivElement>(null);

  const [open, setOpen] = React.useState(false);

  const onClickListItem = (obj: SortType) => {
    dispatch(setSortType(obj));
    setOpen(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
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
};

export default Sort;
