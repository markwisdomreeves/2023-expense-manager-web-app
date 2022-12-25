/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userProfileAction } from "../../redux/slices/users/usersSlices";
import LoadingComponent from "../../components/Loading";
import ErrorDisplayMessage from "../../components/ErrorDisplayMessage";
import UserProfileIncDetails from "./UserProfileIncDetails";
import { Link } from "react-router-dom";


const UserProfileIncList = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userProfileAction());
  }, [dispatch]);

  //State
  const users = useSelector(state => state.users);
  const { loading, appErr, serverErr, profile } = users;

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : appErr || serverErr ? (
        <ErrorDisplayMessage>
          {serverErr} {appErr}
        </ErrorDisplayMessage>
      ) : (
        <section className="py-6">
          <div className="container-fluid">
            <div className="position-relative border rounded-2">

              <div className="pt-8 px-8 mb-8 custom_income_box">
                <div className="custom_income_text_box">
                  <h6 className="mb-0 fs-3 text-success">Recent Income transactions...</h6>
                  <p className="mb-0">
                    Below is the history of your income transactions.
                  </p>
                </div>
                <Link
                  to="/user-expenses"
                  id="custom_income_btn"
                  className="btn btn-outline-secondary me-2 m-2"
                >
                  View Expense Transactions
                </Link>
              </div>

              <table className="table">
                <thead>
                  <tr className="table-active main-global-table-box">
                    <th scope="col">
                      Title
                    </th>
                    <th scope="col">
                      Description
                    </th>
                    <th scope="col">
                      Amount
                    </th>
                    <th scope="col">
                      Date
                    </th>
                    <th scope="col">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {profile?.income?.length <= 0 ? (
                    <p className="global-text-size">No Income Found</p>
                  ) : (
                    profile?.income?.map(inc => (
                      <UserProfileIncDetails item={inc} key={inc?._id} />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "20px",
            }}
          ></div>
        </section>
      )}
    </>
  );
};

export default UserProfileIncList;
