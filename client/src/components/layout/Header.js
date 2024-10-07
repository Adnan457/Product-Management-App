import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import "../../styles/Header.css"; // Custom CSS for header
import cartIcon from "../../../src/bag.png"; // Update with your image path
import { AiOutlineHeart } from "react-icons/ai";

const Header = () => {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <>
      {/* Scrolling Text */}
      <div className="scrolling-text-container">
        <p className="scrolling-text">
          Due to currency devaluation, pricing and availability are
          unpredictable. Please contact us before placing an order.
        </p>
      </div>

      <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img
              src="/images/gpu.png"
              alt="TechZone"
              className="logo-icon-svg"
            />
            <span className="logo-text">TechZone</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              <li className="nav-item mx-2">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown mx-2">
                <NavLink
                  to="#"
                  className="nav-link dropdown-toggle"
                  id="categoryDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Category
                </NavLink>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="categoryDropdown"
                >
                  <li>
                    <NavLink
                      to="/category/graphic-cards"
                      className="dropdown-item"
                    >
                      Graphic Cards
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/category/gaming-processors"
                      className="dropdown-item"
                    >
                      Gaming Processors
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/category/gaming-motherboards"
                      className="dropdown-item"
                    >
                      Gaming Motherboards
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item mx-2">
                <SearchInput />
              </li>
              {!auth?.user ? (
                <>
                  <li className="nav-item mx-2">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item mx-2">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <li className="nav-item dropdown mx-2">
                  <NavLink
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {auth?.user?.name}
                  </NavLink>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                        className="dropdown-item"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={handleLogout}
                        to="/login"
                        className="dropdown-item"
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>
              )}
              <li className="nav-item mx-2">
                <NavLink to="/wishlist" className="nav-link">
                  <AiOutlineHeart className="wishlist-icon" />
                </NavLink>
              </li>
              <li className="nav-item mx-2">
                <NavLink to="/cart" className="nav-link cart-link">
                  <img src={cartIcon} alt="Add to Cart" className="cart-icon" />
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
