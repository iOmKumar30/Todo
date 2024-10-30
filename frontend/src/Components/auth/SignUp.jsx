import React, { useState, useRef } from "react";
import signupImage from "../../assets/signup.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
function SignUp() {
  const [Input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const inputRef3 = useRef();
  const inputRef4 = useRef();

  const handleKeyDown = (e, nextInputRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextInputRef.current?.focus();
    }
  };

  const [RepeatPassword, setRepeatPassword] = useState("");

  const change = (e) => {
    const { name, value } = e.target;
    setInput({ ...Input, [name]: value });
  };

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    if (Input.password !== RepeatPassword) {
      toast.error("Passwords don't match");
      return;
    }

    if (!Input.username || !Input.email || !Input.password) {
      toast.error("Please fill all the fields");
      return;
    }

    await axios
      .post("http://localhost:5000/api/v1/user/register", Input)
      .then((res) => {
        if (res.data) {
          toast.success("Sign Up Successful!");
          setInput({ username: "", email: "", password: "" });
          setTimeout(() => {
            navigate("/signin");
          }, 2000);
        }
      })
      .catch((err) => {
        if (err.response && err.response.data.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Something went wrong, please try again.");
        }
      });
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#343a40" }}>
      <ToastContainer />
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div
              className="card text-white"
              style={{ borderRadius: "25px", backgroundColor: "#495057" }}
            >
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Sign up
                    </p>

                    <form className="mx-1 mx-md-4">
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            ref={inputRef1}
                            type="text"
                            id="username"
                            className="form-control text-white bg-dark"
                            required
                            name="username"
                            onChange={change}
                            value={Input.username}
                            placeholder=" "
                            onKeyDown={(e) => handleKeyDown(e, inputRef2)}
                          />
                          <label
                            className="form-label text-white"
                            htmlFor="username"
                          >
                            Username
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            ref={inputRef2}
                            type="email"
                            id="email"
                            className="form-control text-white bg-dark"
                            required
                            name="email"
                            onChange={change}
                            value={Input.email}
                            placeholder=" "
                            onKeyDown={(e) => handleKeyDown(e, inputRef3)}
                          />
                          <label
                            className="form-label text-white"
                            htmlFor="email"
                          >
                            Your Email
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            ref={inputRef3}
                            type="password"
                            id="password"
                            className="form-control text-white bg-dark"
                            required
                            name="password"
                            onChange={change}
                            value={Input.password}
                            placeholder=" "
                            onKeyDown={(e) => handleKeyDown(e, inputRef4)}
                          />
                          <label
                            className="form-label text-white"
                            htmlFor="password"
                          >
                            Password
                          </label>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            ref={inputRef4}
                            type="password"
                            id="confirmPassword"
                            className="form-control text-white bg-dark"
                            required
                            onChange={(e) => setRepeatPassword(e.target.value)}
                            value={RepeatPassword}
                            placeholder=" "
                            onKeyDown={(e) =>
                              e.key === "Enter" && e.target.form?.submit()
                            }
                          />
                          <label
                            className="form-label text-white"
                            htmlFor="confirmPassword"
                          >
                            Repeat your password
                          </label>
                        </div>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          disabled={RepeatPassword !== Input.password}
                          type="submit"
                          className="btn btn-primary btn-lg"
                          onClick={submit}
                        >
                          Register
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src={signupImage}
                      className="img-fluid"
                      alt="Sign Up Illustration"
                      style={{ width: "626px", height: "450px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
