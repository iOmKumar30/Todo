import React from "react";
import signinImage from "../../assets/signin.webp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Signin.css";

function SignIn() {
  const [Input, setInput] = useState({
    email: "",
    password: "",
  });
  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const handleKeyDown = (e, nextInputRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextInputRef.current?.focus();
    }
  };
  const navigate = useNavigate();
  const change = (e) => {
    const { name, value } = e.target;
    setInput({ ...Input, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!Input.email || !Input.password) {
      toast.error("Please fill all the fields");
      return;
    }
    await axios
      .post(`${window.location.origin}/api/v1/user/signin`, Input)
      .then((res) => {
        console.log(res);
        if (res.data) {
          toast.success(res.data.message);
          setInput({ email: "", password: "" });
          localStorage.setItem("token", res.data.user.token);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.response && err.response.data.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Something went wrong, please try again");
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
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1 pt-5">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Sign In
                    </p>

                    <form className="mx-1 mx-md-4">
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            ref={inputRef1}
                            type="email"
                            id="email"
                            className="form-control text-white bg-dark"
                            required
                            name="email"
                            onChange={change}
                            value={Input.email}
                            placeholder=" "
                            onKeyDown={(e) => handleKeyDown(e, inputRef2)}
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
                            ref={inputRef2}
                            type="password"
                            id="password"
                            className="form-control text-white bg-dark"
                            required
                            name="password"
                            onChange={change}
                            value={Input.password}
                            placeholder=" "
                            onKeyDown={(e) =>
                              e.key === "Enter" && e.target.form?.submit()
                            }
                          />
                          <label
                            className="form-label text-white"
                            htmlFor="password"
                          >
                            Password
                          </label>
                        </div>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg"
                          onClick={submit}
                        >
                          Sign In
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src={signinImage}
                      className="img-fluid"
                      alt="Sign In Illustration"
                      style={{ width: "626px", height: "500px" }}
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

export default SignIn;
