import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { userProfileAction } from "../../redux/slices/users/usersSlices";
import GraphData from "../../components/GraphData";
import calcTransaction from "../../utils/accountStatistics";
import UserProfileStats from "./UserProfileStats";
import LoadingComponent from "../../components/Loading";
import ErrorDisplayMessage from "../../components/ErrorDisplayMessage";


const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(userProfileAction());
  }, [dispatch]);
  const state = useSelector(state => state.users);
  const { loading, appErr, serverErr, userAuth, profile } = state;

  //Get income statistics
  const incResult =
    profile?.income && calcTransaction(profile?.income ? profile.income : []);

  //Get expense statistics
  const expResult = profile?.expenses && calcTransaction(profile?.expenses);

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : appErr || serverErr ? (
        <ErrorDisplayMessage>
          {serverErr} {appErr}
        </ErrorDisplayMessage>
      ) : (
        <section className="py-5">
          <div className="container">
            <div className="position-relative p-8 border rounded-2">
              <div className="d-flex mb-6 align-items-center" id="custom-profile-box">
                <div className="custom-profile-text-content-box">
                  <img
                    style={{width: "100px", height: "100px", margin: "4px", borderRadius: "50px"}}
                    src={profile?.avatar}
                    alt=""
                  />
                  <div className="main-custom-profile-text-box">
                    <div className="fw-bold mb-0 custom-profile-text-box">
                      <span>
                        {profile?.firstname} {profile?.lastname}
                      </span>
                      <span className="badge ms-2 bg-info-light text-info">
                        {profile?.expenses?.length + profile?.income?.length} {""}
                        Records Created
                      </span>
                    </div>

                    <div className="custom-profile-text-box">
                      <p className="mb-0">{profile?.email}</p>
                      <p className="mb-0">
                        {moment(profile?.createdAt).format('LL')}
                      </p>
                    </div>

                    <div className="custom-profile-btn-box">
                      <button
                        onClick={() =>
                          history.push({
                            pathname: "update-profile",
                            state: {
                              user: userAuth,
                            },
                          })
                        }
                        className="btn"
                      >
                        Edit Profile
                        <i className="bi bi-pen fs-3 m-3 text-info"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <GraphData
                  income={incResult?.sumTotal}
                  expenses={incResult?.sumTotal}
                />
              </div>

              <p className="mb-8"></p>

              <UserProfileStats
                numOfTransExp={profile?.expenses?.length}
                avgExp={expResult?.avg}
                totalExp={expResult?.sumTotal}
                minExp={expResult?.min}
                maxExp={expResult?.max}
                numOfTransInc={profile?.income?.length}
                avgInc={incResult?.avg}
                totalInc={incResult?.sumTotal}
                minInc={incResult?.min}
                maxInc={incResult?.max}
              />
              <div className="d-flex align-items-center justify-content-center main-profile-btn-color-box" id="custom-profile-btn-box">
                <button
                  onClick={() => history.push("/user-expenses")}
                  className="btn me-4 w-100 d-flex align-items-center justify-content-center total-expense-profile-btn-color"
                >
                  <span>View Expenses History</span>
                </button>
                <button
                  onClick={() => history.push("/user-income")}
                  className="btn w-100 total-income-profile-btn-color d-flex align-items-center justify-content-center"
                >
                  <span>View Incomes History</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Profile;
