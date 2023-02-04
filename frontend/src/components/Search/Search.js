import React from "react";
import AllQuestions from "../StackOverflow/AllQuestions";
import { useEffect, useState, useRef } from "react";

export default function Search() {
  const searchRef = useRef();
  const [questions, setQuestions] = useState([]);
  const [view, setView] = useState(false);
  const generateUniqueId = () => {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);
    return `id-${timestamp}-${hexadecimalString}`;
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/question");
    var data = await res.json();
    const toSearch = searchRef.current.value;
    console.log(toSearch);
    console.log(data);
    let ques2 = [];
    let ques = data.filter(function (q) {
      if (q.tags[0].includes(toSearch)) {
        ques2.push(q);
      }
    });
    setQuestions(ques2);
    if (questions.length !== 0) {
      setView(true);
    }
    console.log(questions);
  };
  return (
    <>
      <div className="header-middle">
        <div className="header-search-container">
          <input type="text" placeholder="Search..." ref={searchRef} />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
    </>
  );
}
