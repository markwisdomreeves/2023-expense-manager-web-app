/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import moneySVG from "../../img/Investment data-amico-new.svg";
import { createIncomeAction } from "../../redux/slices/income/incomeSlices";
import DisabledLoginButton from "../../components/DisabledLoginButton";
import ErrorDisplayMessage from "../../components/ErrorDisplayMessage";


//form validations
const formSchema = Yup.object({
  title: Yup.string().required("title is required"),
  description: Yup.string().required("description is required"),
  amount: Yup.number().required("Amount is required"),
});


const AddIncome = () => {
  const history = useHistory();

  //dispatch
  const dispatch = useDispatch();

  //formik form
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      amount: "",
    },
    onSubmit: values => {
      dispatch(createIncomeAction(values));
    },
    validationSchema: formSchema,
  });

  //Get expense created from store
  const state = useSelector(state => state.income);
  const { loading, appErr, serverErr, isIncCreated } = state;

  //Redirect
  useEffect(() => {
    if (isIncCreated) history.push("/user-income");
  }, [isIncCreated, dispatch, history]);
  return (
    <>
      <section className="py-5 bg-success vh-100">
        <div className="container text-center">
          <a className="d-inline-block mb-5">
            <img
              className="img-fluid"
              src={moneySVG}
              alt="SVGeXPENSES"
              width="150"
            />
          </a>
          <div className="row mb-4">
            <div className="col-12 col-md-8 col-lg-5 mx-auto">
              <div className="p-4 shadow-sm rounded bg-white">
                <form onSubmit={formik.handleSubmit}>
                  <span className="text-muted">Income</span>
                  <h2 className="mb-4 fw-light text-success">Record New Income</h2>

                  {/* Display income Err */}
                  {serverErr || appErr ? (
                    <ErrorDisplayMessage>
                      {serverErr} {appErr}
                    </ErrorDisplayMessage>
                  ) : null}

                  <div className="mb-3 input-group global-form-input-box">
                    <input
                      value={formik.values.title}
                      onChange={formik.handleChange("title")}
                      onBlur={formik.handleBlur("title")}
                      className="form-control"
                      type="text"
                      placeholder="Enter Title"
                    />
                    {/* Err */}
                    <div className="text-danger mb-2 global-error-text">
                      {formik.touched.title && formik.errors.title}
                    </div>
                  </div>

                  <div className="mb-3 input-group global-form-input-box">
                    <input
                      value={formik.values.description}
                      onChange={formik.handleChange("description")}
                      onBlur={formik.handleBlur("description")}
                      className="form-control"
                      type="text"
                      placeholder="Enter Description"
                    />
                    {/* Err */}
                    <div className="text-danger mb-2 global-error-text">
                      {formik.touched.description && formik.errors.description}
                    </div>
                  </div>

                  <div className="mb-3 input-group global-form-input-box">
                    <input
                      value={formik.values.amount}
                      onChange={formik.handleChange("amount")}
                      onBlur={formik.handleBlur("amount")}
                      className="form-control"
                      type="number"
                      placeholder="Enter Amount"
                    />
                    {/* Err */}
                    <div className="text-danger mb-2 global-error-text">
                      {formik.touched.amount && formik.errors.amount}
                    </div>
                  </div>

                  {loading ? (
                    <DisabledLoginButton />
                  ) : (
                    <button type="submit" className="btn btn-success mb-4 w-100">
                      Record Income
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddIncome;
