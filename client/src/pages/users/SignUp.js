import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import { registerUserAction } from "../../redux/slices/users/usersSlices";
import DisabledRegisterButton from "../../components/DisabledRegisterButton";


//form validations
const formSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
  firstname: Yup.string().required("First Name is required"),
  lastname: Yup.string().required("Last Name is required"),
});

const SignUp = () => {

  //history
  const history = useHistory();

  //get data from store
  const user = useSelector(state => state?.users);
  const { userAppErr, userServerErr, userLoading, isRegistered } = user;

  //dispatch
  const dispatch = useDispatch();

  //formik form
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
    },
    onSubmit: values => {
      dispatch(registerUserAction(values));
    },
    validationSchema: formSchema,
  });

  // Redirect
  useEffect(() => {
    if (isRegistered) {
      history.push("/signin");
    }
  }, [isRegistered, history]);

  return (
    <section className="position-relative py-5 bg-primary overflow-hidden vh-100" >
      <div className="d-none d-md-block position-absolute top-0 start-0 bg-dark w-75 h-100"></div>
      <div className="d-md-none position-absolute top-0 start-0 bg-primary w-100 h-100"></div>
      <div className="container position-relative mx-auto custom-signup-box main-signup-container">
        <div className="row align-items-center">
          <div className="col-12 col-lg-5 mb-3">
            <div className="global-user-login custom-user-login-box">
              <h2 className="display-5 fw-bold mb-3 text-white">
                Keep Track of your income and expenditure flow
              </h2>
            </div>
          </div>
          <div className="col-12 col-lg-5 ms-auto custom-signup-box">
            <div className="p-5 bg-light rounded text-center" id="custom-signup-form-box">
              <form onSubmit={formik.handleSubmit}>
                <span className="text-muted">New User</span>
                <h3 className="fw-bold mb-5 text-primary">Sign Up for a new account</h3>

                {/* Display err here */}
                {userAppErr || userServerErr ? (
                  <div class="alert alert-danger" role="alert">
                    {userServerErr} {userAppErr}
                  </div>
                ) : null}

                <div className="mb-3 input-group global-form-input-box">
                  <input
                    value={formik.values.firstname}
                    onChange={formik.handleChange("firstname")}
                    onBlur={formik.handleBlur("firstname")}
                    className="form-control"
                    type="text"
                    placeholder="First Name"
                  />
                  {/* Err */}
                  <div className="text-danger mb-2 global-error-text">
                    {formik.touched.firstname && formik.errors.firstname}
                  </div>
                </div>

                <div className="mb-3 input-group global-form-input-box">
                  <input
                    value={formik.values.lastname}
                    onChange={formik.handleChange("lastname")}
                    onBlur={formik.handleBlur("lastname")}
                    className="form-control"
                    type="text"
                    placeholder="Last Name"
                  />
                  {/* Err */}
                  <div className="text-danger mb-2 global-error-text">
                    {formik.touched.lastname && formik.errors.lastname}
                  </div>
                </div>

                <div className="mb-3 input-group global-form-input-box">
                  <input
                    value={formik.values.email}
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                    className="form-control"
                    type="email"
                    placeholder="Email"
                  />
                  {/* Err */}
                  <div className="text-danger mb-2 global-error-text">
                    {formik.touched.email && formik.errors.email}
                  </div>
                </div>

                <div className="mb-3 input-group global-form-input-box">
                  <input
                    value={formik.values.password}
                    onChange={formik.handleChange("password")}
                    onBlur={formik.handleBlur("password")}
                    className="form-control mb-2"
                    type="password"
                    placeholder="Password"
                  />
                  {/* Err */}
                  <div className="text-danger mb-2 global-error-text">
                    {formik.touched.password && formik.errors.password}
                  </div>
                </div>

                {userLoading ? (
                  <DisabledRegisterButton />
                ) : (
                  <button
                    type="submit"
                    className="btn py-2 bg-primary text-white w-100 mb-4"
                  >
                    Sign Up
                  </button>
                )}
              </form>
              <div className="refered-link-box">
                <span>Already a member?</span>
                <Link to="/signin" className="signin global-sign"> Sign In</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
