import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-us-container">
      <section className="about-section">
        <h1 className="about-heading">About Us</h1>
        <p className="about-text">
          Welcome to <strong>TODO</strong>, your ultimate task management
          solution! We believe in simplifying your life by organizing your tasks
          efficiently and effectively. With <strong>TODO</strong>, you can
          track, manage, and prioritize your to-dos with ease, ensuring you stay
          productive and focused on what matters most. Join us on our journey to
          make task management simple and intuitive for everyone.
        </p>
        <p className="about-text">
          Our mission is to help you organize your life better, boost
          productivity, and achieve your goals effortlessly.
          <strong>TODO</strong> offers a seamless, user-friendly interface with
          powerful features to stay on top of your tasks. Whether you are a
          student, a professional, or a homemaker, we have something for you.
        </p>
      </section>

      <section className="contact-section">
        <h2 className="contact-heading">Contact Us</h2>
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact-number">Contact Number</label>
            <input
              type="tel"
              id="contact-number"
              name="contact-number"
              className="form-input"
              placeholder="Enter your contact number"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              className="form-textarea"
              placeholder="Write your message here..."
              required
            ></textarea>
          </div>
          <button type="submit" className="contact-submit-btn">
            Contact Us
          </button>
        </form>
      </section>
    </div>
  );
};

export default About;
