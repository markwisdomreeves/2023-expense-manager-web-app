import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Container } from "react-bootstrap";
import { logout } from "../../../redux/slices/users/usersSlices";


const AdminNavbar = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Navbar sticky="top" bg="dark" variant="dark" expand="lg">
        <Container>
          <Link to="/" className="navbar-brand">
            <i className="bi bi-currency-exchange fs-1 text-warning"></i>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto main-login-link-box">
              <Link to="/add-income" className="normal-color-style">Add Income</Link>
              <Link to="/add-expense" className="normal-color-style">Add Expense</Link>
              <Link to="/incomes" className="normal-color-style">Users TXN</Link>
              <Link to="/dashboard" className="dashboard-link-color">Dashboard</Link>
              <Link to="/profile" className="profile-link-color">Profile</Link>
              <button
                  onClick={() => dispatch(logout())}
                  className="btn btn-danger me-5"
                >
                  Logout
              </button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
