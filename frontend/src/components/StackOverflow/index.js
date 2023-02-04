import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Main from "./Main";
import { useState } from "react";
import "./css/index.css";
const Index = () => {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    async function getQuestion() {
      const res = await fetch("http://localhost:5000/api/question");
      var data = await res.json();
      setQuestions(data.reverse());
    }
    getQuestion();
  }, []);
  return (
    <div className="stack-index">
      <div className="stack-index-content">
        <Sidebar />
        <Main questions={questions} />
      </div>
    </div>
  );
};

export default Index;
