/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import moneySVG from "../../img/income-img.svg";
import { updateIncomeAction } from "../../redux/slices/income/incomeSlices";
import DisabledLoginButton from "../../components/DisabledLoginButton";
import { Redirect } from "react-router-dom";


//form validations
const formSchema = Yup.object({
  title: Yup.string().required("title is required"),
  description: Yup.string().required("description: is required"),
  amount: Yup.number().required("Amount is required"),
});

const EditIncome = ({
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
      dispatch(updateIncomeAction(data));
    },
    validationSchema: formSchema,
  });

  //get income data form store
  const incomeData = useSelector(state => state.income);
  const { appErr, serverErr, loading, incomeUpdated } = incomeData;

  if (incomeUpdated) return <Redirect to="/user-income" />

  return (
    <section className="py-5 bg-warning vh-100">
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
                <span className="text-muted">Update Income</span>

                {/* Display Err */}
                {appErr || serverErr ? <div>Err</div> : null}

                <h2 className="text-warning fw-light">Update Income</h2>

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
                  <button type="submit" className="btn btn-warning mb-4 w-100">
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

export default EditIncome;
