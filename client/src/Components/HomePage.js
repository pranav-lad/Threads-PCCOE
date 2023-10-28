import React from "react";
import ReactQuill from "react-quill";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Post from "./Post";

const animatedComponents = makeAnimated();

const Homepage = ({
  isSettingsOpen,
  searchtext,
  loading,
  selectedTags,
  selectedFilterTag,
  content,
  user,
  successMessage,
  errorMessage,
  tagOptions,
  handleItemClick,
  handleItemClickSetting,
  handleClose,
  posts,
  filteredPosts,
  fetchLatestQuestions,
  handleChange,
  handleSearchChange,
  handleTagChange,
  handleFilterTagChange,
  handleQuestion,
  clearMessages,
}) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
  };

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

  return (
    <>
      <div className="maincontent">
        <div className="write-container">
          <div className="quora-header">
            <span className="quora-ask-question">Ask a Question</span>
            <button className="quora-submit-btn" onClick={handleQuestion}>
              +
            </button>
          </div>
          {successMessage && (
            <div
              className="alert alert-success"
              role="alert"
              style={{
                backgroundColor: "green",
                color: "white",
                padding: "5px",
                marginBottom: "10px",
              }}
            >
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div
              className="alert alert-danger"
              role="alert"
              style={{
                backgroundColor: "red",
                color: "white",
                padding: "5px",
                marginBottom: "10px",
              }}
            >
              {errorMessage}
            </div>
          )}
          <ReactQuill
            value={content}
            onChange={handleChange}
            modules={modules}
            formats={formats}
            placeholder="Ask a question..."
            className="quora-editor"
          />
          <Select
            components={animatedComponents}
            options={tagOptions}
            isMulti
            value={selectedTags}
            onChange={handleTagChange}
            placeholder="Select tags"
            onFocus={clearMessages}
          />
        </div>

        {loading ? (
          <div className="loader">
            <br></br>
            <h3>Loading .....</h3>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <Post
              key={post._id}
              content={post.content}
              username={post.userName}
              votes={post.votes}
              email={post.email}
              queId={post._id}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Homepage;
