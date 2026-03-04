/*
#######################################################################
#
# Copyright (C) 2025-2026 David C. Harrison. All right reserved.
#
# You may not use, distribute, publish, or modify this code without
# the express written permission of the copyright holder.
#
#######################################################################
*/

import React from 'react';

/**
 * @returns {object} JSX Table
 */
function List() {
  const [books, setBooks] = React.useState([]);
  const [newBook, setNewBook] = React.useState(undefined);
  const [error, setError] = React.useState('');

  const fetchBooks = () => {
    fetch('http://localhost:3010/api/v0/book', {
      method: 'GET',
    })
        .then((response) => {
          if (!response.ok) {
            throw response;
          }
          return response.json();
        })
        .then((json) => {
          setError('');
          setBooks(json);
        })
        .catch((error) => {
          setBooks([]);
          setError(`${error.status} - ${error.statusText}`);
        });
  };

  const connectSocket = () => {
    const ws = new WebSocket('ws://localhost:3010');
    ws.onerror = (error) => {
      setError('WebSocket error', error.message);
    };
    ws.onmessage = (message) => {
      // fetchBooks(); No!
      setNewBook(JSON.parse(message.data));
    };
    ws.onclose = () => {
      setError('WebSocket disconnected, refresh the page when ready.');
    };
    return () => {
      ws.close();
    };
  };

  React.useEffect(() => {
    fetchBooks();
    connectSocket();
  }, []);

  React.useEffect(() => {
    if (newBook) {
      const newBooks = [...books];
      newBooks.push(newBook);
      setBooks(newBooks);
    }
  }, [newBook]);

  return (
    <table id='books'>
      <thead>
        <tr>
          <th>ISBN</th>
          <th>Title</th>
          <th>Author</th>
          <th>Publisher</th>
        </tr>
      </thead>
      <tbody>
        {books.sort((a, b) => (a.title > b.title) ? 1 : -1).map((book) => (
          <tr key={book.isbn} id={'isbn'+book.isbn}>
            <td>{book.isbn}</td>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.publisher}</td>
          </tr>
        ))}
        <tr key={'error'}>
          <td colSpan={4}>{error}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default List;
