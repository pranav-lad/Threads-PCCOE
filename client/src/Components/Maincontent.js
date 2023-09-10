import React, { useEffect, useState } from "react";
import "./Maincontent.css";
import Post from "./Post.js";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Write.css"; // Import custom CSS file for styling
import Sidebar from "./Sidebar";
import "./Navbar.css";
import ProfilePopup from "./ProfilePopup";
import SettingsPopup from "./SettingsPopup";
import Select from "react-select";
import makeAnimated from "react-select/animated"; // Import the animated module

const animatedComponents = makeAnimated(); // Create animated components for react-select

export default function Maincontent() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [searchtext, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedFilterTag, setSelectedFilterTag] = useState(null); // New state variable for tag filtering
  const [content, setContent] = useState("");
  const [user, setUserid] = useState({});
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const tagOptions = [
    { value: "Exams", label: "Exams" },
    { value: "Sports", label: "Sports" },
    { value: "Anantya", label: "Anantya" },
    { value: "Computer", label: "Computer" },
    { value: "Mechanical", label: "Mechanical" },
  ];

  const handleItemClick = () => {
    setIsSettingsOpen(false);
  };

  const handleItemClickSetting = () => {
    setIsSettingsOpen(true);
  };

  const handleClose = () => {
    setIsSettingsOpen(false);
  };

  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    fetchLatestQuestions();
  }, []);

  const fetchLatestQuestions = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/questionRoute/latest-questions`
      );
      if (response.ok) {
        const questions = await response.json();
        setPosts(questions);
        filterPosts();
      } else {
        console.error("Error fetching latest questions:", response.status);
      }
    } catch (error) {
      console.error("Error fetching latest questions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const user = {
          userid: payload._id,
          username: payload.username,
          email: payload.email,
        };
        setUserid(user);
        console.log(payload);
        console.log("User ID:", user);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const handleChange = (value) => {
    setContent(value);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleTagChange = (selectedOptions) => {
    setSelectedTags(selectedOptions);
  };

  const handleFilterTagChange = (selectedOption) => {
    setSelectedFilterTag(selectedOption);
    filterPostsByTag(selectedOption);
  };

  const handleQuestion = async (event) => {
    event.preventDefault();

    try {
      if (!user.userid) {
        console.error("Invalid userid");
        return;
      }

      if (selectedTags.length === 0) {
        setErrorMessage("Please select at least one tag.");
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
        return;
      }

      const tagsString = selectedTags.map((tag) => tag.value).join(" ");

      const questionData = {
        userName: user.username,
        email: user.email,
        content,
        tag: tagsString,
      };
      console.log("Question data: ", questionData);
      const response = await fetch(
        `http://localhost:3001/api/questionRoute/addque/${user.userid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(questionData),
        }
      );

      if (response.ok) {
        const question = await response.json();
        console.log("Question posted successfully:", question);
        setSuccessMessage("Question added successfully!");
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
        setContent("");
        setSelectedTags([]);
        setSelectedFilterTag(null); // Clear the filter tag selection
        fetchLatestQuestions();
      } else {
        console.error("Error posting the question:", response.status);
        setErrorMessage("Error posting the question. Please try again.");
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred. Please try again later.");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  const clearMessages = () => {
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  const filterPosts = () => {
    if (!searchtext) {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter((post) =>
        post.content.toLowerCase().includes(searchtext.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  };

  const filterPostsByTag = (selectedTag) => {
    if (selectedTag) {
      const filtered = posts.filter((post) =>
        post.tag.includes(selectedTag.value)
      );
      setFilteredPosts(filtered);
    } else {
      filterPosts();
    }
  };

  useEffect(() => {
    filterPosts();
  }, [searchtext, posts]);

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
      <div className="Navbar">
        <p className="logo">
          <img
            src="https://png.pngtree.com/element_our/sm/20180518/sm_5afec7f1592f4.jpg"
            width="30px"
            alt="logo"
          />{" "}
          Threads PCCOE
        </p>
        <div className="search">
          <input
            onChange={handleSearchChange}
            value={searchtext}
            placeholder="Search..."
          />
          <img src="https://www.nicepng.com/png/detail/965-9653559_search-icon-circle.png" />
          <div>
            <Select
              options={tagOptions}
              value={selectedFilterTag}
              onChange={handleFilterTagChange}
              isClearable
              placeholder="Filter by tag"
              styles={{
                control: (provided) => ({
                  ...provided,
                  width: "150px",
                }),
              }}
            />
          </div>
        </div>
        {/* Filter posts by tag */}

        <div className="right">
          <ProfilePopup />
        </div>
      </div>
      <div className="the-total-page">
        <Sidebar
          handleItemClick={handleItemClick}
          handleItemClickSetting={handleItemClickSetting}
        />
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
      </div>
      {isSettingsOpen && <SettingsPopup handleClose={handleClose} />}
    </>
  );
}
