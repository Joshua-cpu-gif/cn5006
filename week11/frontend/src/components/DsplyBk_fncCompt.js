import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import API from "../api";          
import DisplayData from './DisplayData';

export default function FncDisplayBooks() {
  const [Books, setBooks] = useState([]);

  useEffect(() => {
    API.get("/allbooks")           
      .then(res => {
        setBooks(res.data);
      })
      .catch(err => {
        console.log("error has occurred", err);
      });
  }, []);

  return (
    <div>
      <DisplayData Books={Books} />
    </div>
  );
}
