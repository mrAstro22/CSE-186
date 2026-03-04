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
 * @returns {object} JSX Component
 */
function Entry() {
  const [book, setBook] = React.useState({});

  const handleInputChange = (event) => {
    const {value, name} = event.target;
    const b = {...book};
    b[name] = value;
    setBook(b);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:3010/api/v0/book', {
      method: 'POST',
      body: JSON.stringify(book),
      headers: {
        'Content-Type': 'application/json',
      },
    })
        .then((res) => {
          if (!res.ok) {
            alert(`Error '${res.statusText}', please try again`);
          }
          // ignore the returned book, the Web Socket in List.jsx
          // will recieve the new book and update the visible list
          return;
        });
  };

  return (
    <form onSubmit={onSubmit}>
      {['isbn', 'title', 'author', 'publisher'].map((field, index) => (
        <input
          key={index}
          name={field}
          placeholder={field}
          onChange={handleInputChange}
          required
        />
      ))}
      <input type="submit" value="Add Book"/>
    </form>
  );
}

export default Entry;
