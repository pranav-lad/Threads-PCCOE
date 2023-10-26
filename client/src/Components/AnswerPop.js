import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import AnsPost from "./AnsPost";
import usePagination from "@mui/material/usePagination/usePagination";
import { useParams } from "react-router-dom";

function AnswerPop() {
  // console.log(queId);
  const { queId } = useParams();
  // const { que } = useParams();
  const [que, setQue] = useState("");
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    fetchAnswers();
  }, []);

  const fetchAnswers = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/questionRoute/answercontent/${queId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data.contentData.answers);
      setQue(data.contentData.questionContent);
      setAnswers(data.contentData.answers);
    } catch (error) {
      console.error("Error fetching answers:", error);
    }
  };
  // console.log(answers);

  const [content, setContent] = useState("");
  const [user, setUserid] = useState({}); // Initialize to null

  useEffect(() => {
    // Check if the token exists in the local storage
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Decode the token to get the payload
        const payload = JSON.parse(atob(token.split(".")[1]));
        // Extract the userid from the payload
        const user = {
          userid: payload._id,
          username: payload.username,
          email: payload.email,
        };
        setUserid(user);
        // console.log(payload);

        // console.log("User ID:", user);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const HandleAnswer = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3001/api/answerRoute/addans/${user.userid}/${queId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content }),
        }
      );

      if (response.ok) {
        setContent("");
        fetchAnswers();
      }

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Answer added successfully:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
  };
  // removed strike and clean option
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "link",
    "image",
  ];
  const handleChange = (value) => {
    setContent(value);
    // console.log(value);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <hr />
        <div
          style={{ textAlign: "left", maxHeight: "40vh", overflow: "scroll" }}
          dangerouslySetInnerHTML={{ __html: que }}
        ></div>
        <hr />
        <div className="">
          <div className="quora-header"></div>
          <ReactQuill
            value={content}
            onChange={handleChange}
            modules={modules}
            formats={formats}
            placeholder="Answer The Above Question"
            className="quora-editor"
          />
          <span>
            <button
              onClick={HandleAnswer}
              className="quora-submit-btn"
              style={{ fontSize: "16px" }}
            >
              Submit Answer +
            </button>
          </span>
        </div>
        {/* <div className="button">
          <button onClick={onClose}>Close</button>
        </div> */}
        <div>
          {/* Render the newly created answer */}
          {answers.map((answer, index) => (
            <AnsPost key={index} props={answer} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AnswerPop;
