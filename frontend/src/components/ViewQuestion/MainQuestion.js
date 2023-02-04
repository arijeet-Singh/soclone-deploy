import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import ReactQuill from "react-quill";
import ReactHtmlParser from "react-html-parser";
import "react-quill/dist/quill.snow.css";
import "./index.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../feature/userSlice";
const MainQuestion = () => {
  const generateUniqueId = () => {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);
    return `id-${timestamp}-${hexadecimalString}`;
  };

  const user = useSelector(selectUser);
  const userId = user.uid;

  const [show, setShow] = useState(false);
  const [answer, setAnswer] = useState("");
  const [comment, setComment] = useState("");
  const [questionData, setQuestionData] = useState();

  const [upvote, setUpvote] = useState(0);
  const [downvote, setDownvote] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);
  let search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get("q");

  const handleUpvote = async () => {
    try {
      const res = await axios.put(`/api/question/${id}/upvote`, {
        userId: userId,
      });
    } catch (err) {
      console.log(err);
    }
    setUpvote(isLiked ? upvote - 1 : upvote + 1);
    setIsLiked(!isLiked);
  };
  const handleDownvote = async () => {
    try {
      const res = await axios.put(`/api/question/${id}/downvote`, {
        userId: userId,
      });
    } catch (err) {
      console.log(err);
    }
    setUpvote(isDownvoted ? upvote + 1 : upvote - 1);
    setIsDownvoted(!isDownvoted);
  };

  const handleQuill = (value) => {
    setAnswer(value);
  };

  const handleComment = async () => {
    if (comment !== "") {
      const body = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question_id: id,
          comment: comment,
          user: user,
        }),
      };
      fetch(`http://localhost:5000/api/comment/${id}`, body)
        .then((res) => {
          res.json();
          console.log(res);
          alert("Comment added Successfully");
          setComment("");
          setShow(false);
          getUpdatedAnswer();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleSubmit = async () => {
    if (answer !== "") {
      const body = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question_id: id,
          answer: answer,
          user: user,
        }),
      };
      fetch("http://localhost:5000/api/answer", body)
        .then((res) => {
          res.json();
          alert("Answer added Successfully");
          setAnswer("");
          getUpdatedAnswer();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    async function getQuestionDetails() {
      const res = await fetch(`http://localhost:5000/api/question/${id}`);
      var data = await res.json();
      setQuestionData(data[0]);
      setDownvote(data[0].downvote.length);
      setUpvote(data[0].upvote.length);
      setIsLiked(data[0].upvote.includes(userId));
      setIsDownvoted(data[0].downvote.includes(userId));
    }
    getQuestionDetails();
    // console.log(isLiked);
  }, [id]);

  async function getUpdatedAnswer() {
    const res = await fetch(`http://localhost:5000/api/question/${id}`);
    var data = await res.json();
    setQuestionData(data[0]);
  }
  const deleteQuestion = async (e) => {
    e.preventDefault();
    if (questionData.user.uid === user.uid) {
      try {
        const res = await axios.delete(`/api/question/${id}/delete`);
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="main">
      <div className="main-container">
        <div className="main-top">
          <h2 className="main-question">{questionData?.title}</h2>
          <button onClick={deleteQuestion}>Delete Question</button>
          <Link to="/add-question">
            <button>Ask Question</button>
          </Link>
        </div>
        <div className="main-desc">
          <div className="info">
            <p>{new Date(questionData?.created_at).toLocaleString()}</p>
          </div>
        </div>
        <div className="all-questions">
          <div className="all-questions-container">
            <div className="all-questions-left">
              <div className="all-options">
                <p className="arrow" onClick={handleUpvote}>
                  ▲
                </p>
                <p className="arrow">{upvote}</p>
                <p className="arrow" onClick={handleDownvote}>
                  ▼
                </p>
              </div>
            </div>
            <div className="question-answer">
              <p>{ReactHtmlParser(questionData?.body)}</p>
              <div className="author">
                <small>
                  asked {new Date(questionData?.created_at).toLocaleString()}
                </small>
                <div className="auth-details">
                  <Avatar src={questionData?.user?.photo} />
                  <p>
                    {questionData?.user?.displayName
                      ? questionData?.user?.displayName
                      : String(questionData?.user?.email).split("@")[0]}
                  </p>
                </div>
              </div>
              <div className="comments">
                <div className="comment">
                  {questionData?.comments &&
                    questionData?.comments?.map((_qd) => (
                      <p key={generateUniqueId()}>
                        {_qd?.comment} -{" "}
                        <span>
                          {_qd?.user?.displayName
                            ? _qd?.user?.displayName
                            : String(_qd?.user?.email).split("@")[0]}
                        </span>
                        <small>
                          {new Date(_qd?.created_at).toLocaleString()}
                        </small>
                      </p>
                    ))}
                </div>
                <p onClick={() => setShow(!show)}>Add a comment</p>
                {show && (
                  <div className="title">
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      type="text"
                      placeholder="Add your comment..."
                      rows={5}
                      style={{
                        margin: "5px 0px",
                        padding: "10px",
                        border: "1px solid rgba(0,0,0,0.2)",
                        borderRadius: "3px",
                        outline: "none",
                      }}
                    ></textarea>
                    <button
                      onClick={handleComment}
                      style={{ maxWidth: "fit-content" }}
                    >
                      Add Comment
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="all-questions" style={{ flexDirection: "column" }}>
          <p
            style={{
              marginBottom: "20px",
              fontSize: "1.3rem",
              fontWeight: "300",
            }}
          >
            {questionData?.answerDetails?.length} Answers(s)
          </p>
          {questionData?.answerDetails?.map((_q) => (
            <div
              key={_q?._id + generateUniqueId()}
              className="all-questions-container"
            >
              <div className="all-questions-left">
                <div className="all-options">
                  {/* <p className="arrow">▲</p>
                  <p className="arrow">0</p>
                  <p className="arrow">▼</p> */}
                </div>
              </div>
              <div className="question-answer">
                <p>{ReactHtmlParser(_q?.answer)}.</p>
                <div className="author">
                  <small>
                    answered {new Date(_q?.created_at).toLocaleString()}{" "}
                  </small>
                  <div className="auth-details">
                    <Avatar src={_q?.user?.photo} />
                    <p>
                      {_q?.user?.displayName
                        ? _q?.user?.displayName
                        : String(_q?.user?.email).split("@")[0]}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="main-answer">
        <h3 style={{ fontSize: "22px", margin: "10px 0", fontWeight: "400" }}>
          Your Answer
        </h3>
        <ReactQuill
          value={answer}
          onChange={handleQuill}
          className="react-quill"
          theme="snow"
          style={{ height: "200px" }}
        />
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        style={{ marginTop: "50px", maxWidth: "fit-content" }}
      >
        Post Your Answer
      </button>
    </div>
  );
};

export default MainQuestion;
