import { FcTodoList } from "react-icons/fc";
import "./Navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import user from "../../assets/user.jpeg";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // To trigger re-check on route change

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [location]); // Re-run on route change

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false); // Update state after logout
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div
        className="container-fluid"
        style={{ paddingLeft: "2rem", paddingRight: "2rem" }}
      >
        <FcTodoList
          style={{ width: "1.75rem", height: "1.75rem", opacity: 1.5 }}
        />
        <Link
          className="navbar-brand"
          to="/"
          style={{ fontSize: "1.5rem", fontWeight: "bold" }}
        >
          <b>TODO</b>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto d-flex align-items-center">
            <li className="nav-item">
              <Link
                className="nav-link active btn-nav"
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active btn-nav"
                aria-current="page"
                to="/about"
              >
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active btn-nav"
                aria-current="page"
                to={isLoggedIn ? "/todo" : "/signin"}
              >
                Todo
              </Link>
            </li>

            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link active btn-nav boxed"
                    aria-current="page"
                    to="/signup"
                  >
                    SignUp
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active btn-nav boxed"
                    aria-current="page"
                    to="/signin"
                  >
                    SignIn
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link active btn-nav boxed"
                    aria-current="page"
                    to="/"
                    onClick={handleLogout}
                  >
                    LogOut
                  </Link>
                </li>
                <li className="nav-item">
                  <img
                    className="rounded-circle img-fluid ms-3"
                    src={user}
                    alt="Profile"
                    width="30"
                    height="30"
                  />
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
