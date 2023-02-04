import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./css/Tags.css";
function Tags() {
  const [questions, setQuestions] = useState([]);
  const [allTags, setAllTags] = useState([]);
  let ques2 = [];
  let tagSet = new Set();
  let a = new Set();
  const generateUniqueId = () => {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);
    return `id-${timestamp}-${hexadecimalString}`;
  };
  useEffect(() => {
    async function getQuestion() {
      const res = await fetch("http://localhost:5000/api/question");
      var data = await res.json();
      setQuestions(data);
      data.map((q) => {
        ques2.push(q.tags[0]);
      });
      ques2.map((tagsArray) => {
        let tags = JSON.parse(tagsArray);
        let i;
        for (i = 0; i < tags.length; i++) {
          tagSet.add(tags[i]);
        }
      });
      tagSet = Array.from(tagSet);
      setAllTags(tagSet);
    }
    getQuestion();
  }, []);
  return (
    <div className="stack-index">
      <div className="stack-index-content">
        <Sidebar />
        <div className="main">
          <p>
            <h1>Tags</h1>
            <br />A tag is a keyword or label that categorizes your question
            with other, similar questions.
            <br /> Using the right tags makes it easier for others to find and
            answer your question.
          </p>
          <div className="main-container">
            <div className="questions-2">
              {allTags.length !== 0 && (
                <>
                  {allTags.map((_tag) => (
                    <span key={generateUniqueId()} className="question-tags-2">
                      {_tag}
                    </span>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tags;
