import React, { useState } from "react";
import "./Post.css";
import AnswerPop from "./AnswerPop";
import "./popoupstyle.css";

export default function Post(props) {
  const { content, username, votes, email, queId } = props;
  const [isLiked, setIsLiked] = useState(false);
  const [isbookmarked, setIsbookmarked] = useState(false);

  const [showPopup, setShowPopup] = useState(false);

  // const openPopup = () => {
  //   setShowPopup(true);
  // };

  const handleQuestionClick = (tutorProfile) => {
    // setSelectedTutorProfile(tutorProfile);
    const QuestionUrl = `/questionAnswer/${queId}`;
    window.open(QuestionUrl, "_blank");
  };

  const closePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };
  const handleLikeClick2 = () => {
    setIsbookmarked(!isbookmarked);
  };

  return (
    <div className="post">
      <div className="upper">
        <div className="detail">
          <div className="username title">
            <img
              src="https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg"
              alt="Profile"
            />
            <div className="person">
              <span className="username">{username}</span>
              <span className="email">{email}</span>
            </div>
          </div>
          <div className="icons">
            <img
              src="https://img.icons8.com/?size=512&id=59805&format=png"
              alt="Icon 1"
              className={`like ${isLiked ? "liked" : ""}`}
              onClick={handleLikeClick}
            />
            <img
              src="https://img.icons8.com/?size=512&id=59740&format=png"
              alt="Icon 2"
              className={`bookmark ${isbookmarked ? "bookmarked" : ""}`}
              onClick={handleLikeClick2}
            />
            <img
              src="https://img.icons8.com/?size=512&id=98963&format=png"
              alt="Icon 3"
            />
          </div>
        </div>
      </div>

      <div
        className="lower"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
      <div>
        <div className="bar">
          <div className="votes">Votes: {votes}</div>
          <div
            className="reply"
            style={{
              width: "auto",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/1933/1933011.png"
              width="20px"
              style={{ marginRight: "10px" }}
            />
            <span onClick={handleQuestionClick}>Reply</span>
          </div>
        </div>
        {/* {showPopup && (
          <AnswerPop onClose={closePopup} que={content} queId={queId} />
        )} */}
      </div>
    </div>
  );
}
