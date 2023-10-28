import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginSignupPage.css";
import firebase from "./firebase";
import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import google from "./googlelogo.png";
// Import the LoginSuccessPopup component
import LoginSuccessPopup from "./LoginSuccessPopup";

function LoginSignup() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleFormToggle = () => {
    setIsLoginForm(!isLoginForm);
  };

  async function login_with_google(e) {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(firebase.auth(), provider);
      console.log("result", result);
      console.log("Logged in successfully");
      navigate("/home");

      // Show the LoginSuccessPopup after successful login
      setShowLoginSuccessPopup(true);
    } catch (err) {
      alert(err.message);
    }
  }
  // function to validate email
  const validateEmail = (email) => {
    const domain = "pccoepune.org";
    const emailParts = email.split("@");
    if (emailParts.length === 2 && emailParts[1].toLowerCase() === domain) {
      setEmail(email);
      return true;
    } else {
      console.log("Use only pccoepune.org email, ex. user@pccoepune.org");
      // alert("wrong email");
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isLoginForm) {
      // Handle login
      const loginData = { email, password };
      // validateEmail(email);
      try {
        const response = await fetch("http://localhost:3001/api/login/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        });

        const data = await response.json();
        // If login was successful and a redirect URL is provided
        if (response.ok) {
          // Save the token in localStorage or any secure storage method of your choice
          localStorage.setItem("token", data.token);

          // Redirect the user to the "home.js" page
          navigate("/home");

          // Show the LoginSuccessPopup after successful login
          setShowLoginSuccessPopup(true);
        } else {
          // Handle login error
          console.log(data.message);
        }
      } catch (error) {
        console.log("Error occurred:", error);
      }
    } else {
      // Handle signup
      const signupData = { username, email, password };
      if (validateEmail(email)) {
        try {
          const response = await fetch("http://localhost:3001/api/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(signupData),
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        alert("wrong email");
      }
      window.location.reload();
    }
  };

  // State to control the visibility of LoginSuccessPopup
  const [showLoginSuccessPopup, setShowLoginSuccessPopup] = useState(false);

  return (
    <div className="container">
      <div className="form-card">
        <div className="logo-container">
          <img
            src="https://png.pngtree.com/element_our/sm/20180518/sm_5afec7f1592f4.jpg"
            width="30px"
            alt="Logo"
            className="logo"
          />
          Threads PCCOE
        </div>
        <div className="form-tabs">
          <button
            className={isLoginForm ? "active" : "notactive"}
            onClick={() => setIsLoginForm(true)}
          >
            Login
          </button>
          <button
            className={!isLoginForm ? "active" : "notactive"}
            onClick={() => setIsLoginForm(false)}
          >
            Sign Up
          </button>
        </div>
        <form method="post" onSubmit={handleSubmit}>
          {isLoginForm ? (
            <>
              <input
                type="text"
                placeholder="Username"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Login</button>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Full Name"
                name="fullname"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Sign Up</button>
            </>
          )}
        </form>
        <div className="google-login">
          <span>Or</span>
          <button onClick={login_with_google}>
            <img className="googlelogo" src={google} /> Google
          </button>
        </div>
      </div>

      {/* Show the LoginSuccessPopup if showLoginSuccessPopup is true */}
      {showLoginSuccessPopup && <LoginSuccessPopup /> &&
        alert("sign up successful") &&
        window.location.reload()}
    </div>
  );
}

export default LoginSignup;
