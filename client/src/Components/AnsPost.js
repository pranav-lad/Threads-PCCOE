import React, { useState, useEffect } from "react";
import "./Post.css";
import AnswerPop from "./AnswerPop";
import "./popoupstyle.css";

function AnsPost({ props }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isbookmarked, setIsbookmarked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Simulate loading for 2 seconds (you can replace this with actual data fetching)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, []);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  const handleLikeClick2 = () => {
    setIsbookmarked(!isbookmarked);
  };

  return (
    <div>
      {isLoading ? ( // Display loader while loading
        <div className="loader">Loading...</div>
      ) : (
        <div className="post">
          <div className="upper">
            <div className="detail">
              <div className="username title">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg"
                  alt="Profile"
                />
                <div className="person">
                  <span className="username">{props.user.username}</span>
                  <span className="email">{props.user.email}</span>
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
            dangerouslySetInnerHTML={{ __html: props.content }}
          ></div>
          <div>
            <div className="bar">
              <div className="votes">Votes: {props.likes}</div>
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
                <span onClick={openPopup}>Reply</span>
              </div>
            </div>
            {/* {showPopup && (
              <AnswerPop onClose={closePopup} que={content} queId={queId} />
            )} */}
          </div>
        </div>
      )}
    </div>
  );
}

export default AnsPost;
