import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const FullBook = () => {
  const [book, setBook] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchBook() {
      try {
        const { data } = await axios.get(`https://63ecb1a5be929df00cb0201a.mockapi.io/items/${id}`);
        setBook(data);
      } catch (err) {
        alert(err);
        navigate('/');
      }
    }
    fetchBook();
  }, []);

  if (!book) {
    return <>Загрузка...</>;
  }

  return (
    <div className="container">
      <img src={book.imageUrl} />
      <h2>{book.title}</h2>
      <h4>{book.price} ₽</h4>
      <Link to="/">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
};

export default FullBook;
