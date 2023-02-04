import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import "./css/AllQuestions.css";

const AllQuestions = ({ question }) => {
  let tags = JSON.parse(question?.tags[0]);
  const generateUniqueId = () => {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);
    return `id-${timestamp}-${hexadecimalString}`;
  };
  
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  return (
    <div className="all-questions">
      <div className="all-questions-container">
        <div className="all-questions-left">
          <div className="all-options">
            <div className="all-option">
              <p>{question?.answerDetails?.length}</p>
              <span>Answers</span>
            </div>
          </div>
        </div>
        <div className="question-answer">
          <Link to={`/question?q=${question?._id}`}>{question?.title}</Link>
          <div style={{ width: "90%" }}>
            <div>{ReactHtmlParser(truncate(question?.body, 200))}</div>
          </div>
          <div style={{ display: "flex" }}>
            <>
              {tags.map((_tag) => (
                <span
                  key={question?._id + generateUniqueId()}
                  className="question-tags"
                >
                  {_tag}
                </span>
              ))}
            </>
          </div>
          <div className="author">
            <small>{new Date(question?.created_at).toLocaleString()}</small>
            <div className="author-details">
              <Avatar src={question?.user?.photo} />
              <p>
                {question?.user?.displayName
                  ? question?.user?.displayName
                  : localStorage.getItem("DisplayName")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllQuestions;
