import React from "react";
import Navbar from "./Components/navbar/Navbar";
import About from "./Components/about/About";
import HomePage from "./Components/homepage/Home";
import Footer from "./Components/footer/Footer";
import SignUp from "./Components/auth/SignUp";
import SignIn from "./Components/auth/SignIn";
import Todo from "./Components/todo/Todo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
