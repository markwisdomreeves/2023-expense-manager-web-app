import React from "react";
import { Link } from "react-router-dom";
import HomeImg from "../img/Investment data-bro-new.svg";


const Home = () => {
  return (
    <>
      <section id="main-custom-home-page-container">
        <div className="custom-home-image-box">
          <img className="img-fluid" src={HomeImg} alt="" />
        </div>
        <div className="home-page-text-container">
          <div className="home-page-text-content-box">
            <h2 className="text-warning">
              Keep track of how you are spending your money.
            </h2>
            <p className="lead text-muted">
              Tracking your Incomes and Expenses flow just got easier with our accessible personal money tracker web application.
            </p>
            <p className="lead text-muted">
              Know your Incomes and Expenditures today and let us to do the rest for you tomorrow.
            </p>
            <div className="home-page-btn-box">
              <Link
                to="/profile"
                className="btn btn-warning text-white me-2 mb-2 mb-sm-0"
              >
                Track your performance
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
