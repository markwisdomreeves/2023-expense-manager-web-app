/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import moneySVG from "../../img/expensive-img.svg";
import { updateExpAction } from "../../redux/slices/expenses/expensesSlices";
import DisabledLoginButton from "../../components/DisabledLoginButton";
import { Redirect } from "react-router-dom";


//form validations
const formSchema = Yup.object({
  title: Yup.string().required("title is required"),
  description: Yup.string().required("description: is required"),
  amount: Yup.number().required("Amount is required"),
});

const EditExpense = ({
  location: {
    state: { item },
  },
}) => {
  //dispatch
  const dispatch = useDispatch();

  //formik form
  const formik = useFormik({
    initialValues: {
      title: item?.title,
      description: item?.description,
      amount: item?.amount,
    },
    onSubmit: values => {
      const data = {
        ...values,
        id: item?._id,
      };
      dispatch(updateExpAction(data));
    },
    validationSchema: formSchema,
  });

  //get expenses data form store
  const expenseData = useSelector(state => state.expenses);
  const { appErr, serverErr, loading, isExpUpdated } = expenseData;

  if (isExpUpdated) return <Redirect to="/user-expenses" />

  return (
    <section className="py-5 bg-info vh-100">
      <div className="container text-center">
        <a className="d-inline-block mb-5">
          <img
            className="img-fluid"
            src={moneySVG}
            alt="SVGeXPENSES"
            width="200"
          />
        </a>

        <div className="row mb-4">
          <div className="col-12 col-md-8 col-lg-5 mx-auto">
            <div className="p-4 shadow-sm rounded bg-white">
              <form onSubmit={formik.handleSubmit}>
                <span className="text-muted">Update Expense</span>

                {/* Display Err */}
                {appErr || serverErr ? <div>Err</div> : null}

                <h2 className="text-info fw-light">Update Expense</h2>

                <div className="mb-3 input-group">
                  <input
                    value={formik.values.title}
                    onChange={formik.handleChange("title")}
                    onBlur={formik.handleBlur("title")}
                    className="form-control"
                    type="text"
                    placeholder="Enter Title"
                  />
                </div>

                {/* Err */}
                <div className="text-danger mb-2">
                  {formik.touched.title && formik.errors.title}
                </div>
                <div className="mb-3 input-group">
                  <input
                    value={formik.values.description}
                    onChange={formik.handleChange("description")}
                    onBlur={formik.handleBlur("description")}
                    className="form-control"
                    type="text"
                    placeholder="Enter Description"
                  />
                </div>

                {/* Err */}
                <div className="text-danger mb-2">
                  {formik.touched.description && formik.errors.description}
                </div>
                <div className="mb-3 input-group">
                  <input
                    value={formik.values.amount}
                    onChange={formik.handleChange("amount")}
                    onBlur={formik.handleBlur("amount")}
                    className="form-control"
                    type="number"
                    placeholder="Enter Amount"
                  />
                </div>

                {/* Err */}
                <div className="text-danger mb-2">
                  {formik.touched.amount && formik.errors.amount}
                </div>
                {loading ? (
                  <DisabledLoginButton />
                ) : (
                  <button type="submit" className="btn btn-info mb-4 w-100">
                    Update
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditExpense;
