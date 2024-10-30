import React from "react";
import "./Home.css";
import "../homepage/Home.css";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [location]);

  const handleClick = () => {
    if (isLoggedIn) {
      navigate("/todo");
    } else {
      navigate("/signin");
      toast.error("Please login first");
    }
  };
  return (
    <div className="homepage-container">
      <ToastContainer />
      <h1 className="homepage-title">
        <span className="title-line">Organize your</span>
        <span className="title-line">work and life, finally.</span>
      </h1>
      <p className="homepage-description">
        <span className="description-line">
          Simplify life for both you and your team
        </span>
        <span className="description-line">
          {" "}
          with the world’s #1 to-do list app.
        </span>
      </p>
      <Button
        variant="outline-light"
        className="btn-nav btn-hm"
        onClick={handleClick}
      >
        <b>Make Todo List</b>
      </Button>
    </div>
  );
};

export default HomePage;
