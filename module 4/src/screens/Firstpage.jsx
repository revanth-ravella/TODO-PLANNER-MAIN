import "./Firstpage.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

function Firstpage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newUserNumber, setNewUserNumber] = useState("");
  const [inputNumber, setInputNumber] = useState("");
  const navigate = useNavigate();

  // const navigateToTodoplanner = () => {
  //   // Use navigate to navigate to Todoplanner with inputNumber as a parameter
  //   navigate(`/Todoplanner/${inputNumber}`);
  // };
  const handleNewUserClick = () => {
    // Generate a random 5-digit number
    const randomNumber = Math.floor(10000 + Math.random() * 90000);
    setNewUserNumber(randomNumber.toString());
    setIsPopupOpen(true);
  };
  const handleLikeClick = async () => {
    // Add the new number to Firebase data
    try {
      const userRef = doc(db, "Todo", newUserNumber);
      await setDoc(userRef, { liked: true }); // Replace this with your actual data structure

      setIsPopupOpen(false);
    } catch (error) {
      console.error("Error adding new user:", error);
      // Add your error handling logic
    }
  };

  const handleDislikeClick = () => {
    // Generate a new random 5-digit number
    handleNewUserClick();
  };

  const handleInputChange = (e) => {
    // Update the inputNumber state when the input field changes
    setInputNumber(e.target.value);
  };
  const handleLoginClick = async () => {
    console.log("Input Number:", inputNumber);
    try {
      const userRef = doc(db, "Todo", inputNumber);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        console.log("User exists!");
        navigate(`/Todoplanner/${inputNumber}`);
        // navigateToTodoplanner()
        // Add your logic for handling an existing user
      } else {
        console.log("User does not exist.");
        // Add your logic for handling a non-existing user
      }
    } catch (error) {
      console.error("Error checking user:", error);
      // Add your error handling logic
    }
  };

  return (
    <div className="container">
    <div className="login-container">
    <h1>Todo-Planner</h1>
      <input
        type="text"
        placeholder="Enter 5-digit number"
        value={inputNumber}
        onChange={handleInputChange}
        maxLength={5}
        className="input"
      />
      <button className="login-button" onClick={handleLoginClick}>
        Login
      </button>

      <button className="new-user-button" onClick={handleNewUserClick}>
        New User
      </button>

      {isPopupOpen && (
        <div className="popup-background">
          <div className="popup">
            <p>This is your ID, remember! <br/> {newUserNumber}</p>
            <button className="like-button" onClick={handleLikeClick}>
              I liked it
            </button>
            <button className="dislike-button" onClick={handleDislikeClick}>
              I don't like it
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
  );
}

export default Firstpage;
