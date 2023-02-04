import ReactQuill from "react-quill";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import "./Question.css";
import { TagsInput } from "react-tag-input-component";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../feature/userSlice";

const Question = () => {
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const upvote=0;
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title === "") {
      alert("The question title is required");
    } else if (body === "") {
      alert("The question body is required");
    } else {
      if (title !== "" && body !== "") {
        setLoading(true);

        const bodyJSON = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: title,
            body: body,
            tag: JSON.stringify(tags),
            user: user,
            upvote: upvote,
          }),
        };
        fetch("http://localhost:5000/api/question", bodyJSON)
          .then((response) => {
            alert("Question Added Successfully");
            setLoading(false);
            history.push("/");
            response.json();
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      }
    }
  };

  const handleQuill = (value) => {
    setBody(value);
  };

  return (
    <div className="add-question">
      <div className="add-question-container">
        <div className="head-title">
          <h1>Ask a public question</h1>
        </div>
        <div className="question-container">
          <div className="question-options">
            <div className="question-option">
              <div className="title">
                <h3>Title</h3>
                <small>
                  Be specific and imagine you’re asking a question to another
                  person
                </small>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="e.g Is there an R function for finding teh index of an element in a vector?"
                />
              </div>
            </div>
            <div className="question-option">
              <div className="title">
                <h3>Body</h3>
                <small>
                  Include all the information someone would need to answer your
                  question
                </small>
                <ReactQuill
                  value={body}
                  onChange={handleQuill}
                  className="react-quill"
                  theme="snow"
                />
              </div>
            </div>
            <div className="question-option">
              <div className="title">
                <h3>Tags</h3>
                <small>
                  Add up to 5 tags to describe what your question is about
                </small>
                <TagsInput
                  value={tags}
                  onChange={setTags}
                  name="tags"
                  placeHolder="Press Enter to add Tag"
                />
              </div>
            </div>
          </div>
        </div>

        <button
          disable={loading}
          type="submit"
          onClick={handleSubmit}
          className="button"
        >
          {loading ? "Adding Question..." : "Add your question"}
        </button>
      </div>
    </div>
  );
};

export default Question;
