import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import DisplayData from './DisplayData';
import API from "../api";   

export default function DeleteBook() {

  const [state, setState] = useState([]);
  let params = useParams();

  useEffect(() => {
    console.log("useeff delete " + params.id);

    API.post("/deleteBook/" + params.id)     
      .then(() => {
        API.get("/allbooks")                
          .then(res => {
            setState(res.data);
            console.log("data set in the state and state length " + res.data.length);
          })
          .catch(err => {
            console.log("error has occurred", err);
          });
      })
      .catch(err => {
        console.log("error has occurred", err);
      });

  }, [params.id]);

  return (
    <div>
      <DisplayData Books={state} />
    </div>
  );
}
