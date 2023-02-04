import React from "react";
import AllQuestions from "./AllQuestions";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import "./css/Main.css";
const Main = ({ questions }) => {
  const searchRef = useRef();
  let ques2 = [];
  const [question, setQuestion] = useState([]);
  const [view, setView] = useState(false);
  const generateUniqueId = () => {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);
    return `id-${timestamp}-${hexadecimalString}`;
  };
  const handleSearch = async () => {
    ques2 = [];
    const toSearch = searchRef.current.value;
    if (toSearch !== "") {
      await questions.filter(function (q) {
        if (q.tags[0].includes(toSearch)) {
          ques2.push(q);
        }
      });
      setQuestion(ques2);
      if (ques2.length !== 0) {
        setView(true);
      } else {
        alert("No question with this tag yet");
      }
    }
  };

  const handleBack = () => {
    setView(false);
  };
  return (
    <div className="main">
      <div className="header-middle-2">
        <div className="header-search-container">
          <input
            type="text"
            placeholder="Search...(Search is case sensitive)"
            ref={searchRef}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      <div className="main-container">
        <div className="main-top">
          <h2>All Questions</h2>
          <Link to="/add-question">
            <button>Ask Question</button>
          </Link>
        </div>
        <div className="main-desc">
          {!view ? (
            <p>{questions && questions.length} Questions</p>
          ) : (
            <p>{question && question.length} Question(s)</p>
          )}
          <div className="main-filter">
            <a href="https://stackoverflowchatbot.netlify.app/">
              <button>Ask Chatbot</button>
            </a>
          </div>
        </div>
        <div className="questions">
          {!view ? (
            <>
              {questions.map((_q, index) => (
                <>
                  <div key={generateUniqueId()} className="question">
                    <AllQuestions question={_q} />
                  </div>
                </>
              ))}
            </>
          ) : (
            <>
              <KeyboardBackspaceIcon onClick={handleBack} />
              {question.map((_q) => (
                <>
                  <div key={generateUniqueId()} className="question">
                    <AllQuestions question={_q} />
                  </div>
                </>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
