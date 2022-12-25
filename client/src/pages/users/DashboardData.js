import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../../components/Loading";
import ErrorDisplayMessage from "../../components/ErrorDisplayMessage";
import { fetchAccountStatsAction } from "../../redux/slices/accountsStats/accountStatSlices";
import GraphData from "../../components/GraphData";
import currencyFormatter from "../../utils/cuurencyFormatter";


const DashboardData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAccountStatsAction());
  }, [dispatch]);

  const account = useSelector(state => state.account);
  const { loading, accountDetails, appErr, serverErr } = account;

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
          <div className="container">
            <GraphData
              income={accountDetails?.incomeStats[0]?.totalIncome}
              expense={accountDetails?.expenseStats[0]?.totalExp}
            />

            {/* Net Profit */}
            <div className="row">
              <div className="col-12 col-md-6 mb-6">
                <div className="p-8 border rounded-2">
                  <div className="d-flex mb-6 align-items-start justify-content-between">
                    <span
                      className="d-inline-flex align-items-center justify-content-center bg-light-light rounded-2"
                      style={{ width: "40px", height: "40px" }}
                    ></span>

                    {/* Expenses Start */}
                    <span className="badge fs-2 bg-light text-danger">
                      Total Expenses
                    </span>
                  </div>
                  <h1 className="mb-4 text-danger">
                    {currencyFormatter(
                      "USD",
                      accountDetails?.expenseStats[0]?.totalExp
                    )}
                  </h1>
                  <p className="mb-0">
                    <span>Number of Transactions</span>
                    <span className="text-danger ms-1">
                      <span>
                        {accountDetails?.expenseStats[0]?.totalRecordsExp}
                      </span>
                    </span>
                  </p>

                  <p className="mb-0">
                    <span>Minimum Transactions</span>
                    <span className="text-danger ms-1">
                      <span>{accountDetails?.expenseStats[0]?.minExp}</span>
                    </span>
                  </p>

                  <p className="mb-0">
                    <span>Maximum Transactions</span>
                    <span className="text-danger ms-1">
                      <span>{accountDetails?.expenseStats[0]?.maxExp}</span>
                    </span>
                  </p>

                  <p className="mb-0">
                    <span>Average Transactions</span>
                    <span className="text-danger ms-1">
                      <span>{accountDetails?.expenseStats[0]?.averageExp}</span>
                    </span>
                  </p>
                </div>
              </div>

              <div className="col-12 col-md-6 mb-6" id="custom-user-dashboard-box">
                <div className="p-8 border rounded-2">
                  <div className="d-flex mb-6 align-items-start justify-content-between">
                    <span
                      className="d-inline-flex align-items-center justify-content-center bg-danger-light rounded-2"
                      style={{ width: "40px", height: "40px" }}
                    ></span>

                    {/* Income Start */}
                    <span className="badge fs-2 total-income-title-color">
                      Total Income
                    </span>
                  </div>
                  <h1 className="mb-4 total-income-text-color">
                    {currencyFormatter(
                      "USD",
                      accountDetails?.incomeStats[0]?.totalIncome
                    )}
                  </h1>

                  <p className="mb-0">
                    <span>Number of Transactions</span>
                    <span className="total-income-text-color ms-1">
                      <span>
                        {accountDetails?.incomeStats[0]?.totalRecordsIncome}
                      </span>
                    </span>
                  </p>

                  <p className="mb-0">
                    <span>Minimum Transactions</span>
                    <span className="total-income-text-color ms-1">
                      <span>
                        {accountDetails?.incomeStats[0]?.totalRecordsIncome}
                      </span>
                    </span>
                  </p>

                  <p className="mb-0">
                    <span>Maximum Transactions</span>
                    <span className="total-income-text-color ms-1">
                      <span>{accountDetails?.incomeStats[0]?.maxIncome}</span>
                    </span>
                  </p>

                  <p className="mb-0">
                    <span>Average Transactions</span>
                    <span className="total-income-text-color ms-1">
                      <span>
                        {accountDetails?.incomeStats[0]?.averageIncome}
                      </span>
                    </span>
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}
    </>
  );
};


export default DashboardData;
