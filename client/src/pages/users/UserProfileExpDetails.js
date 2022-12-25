import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { deleteExpAction } from "../../redux/slices/expenses/expensesSlices";
import dateFormatter from "../../utils/dateFormatter";
import { useDispatch, useSelector } from "react-redux";


const UserProfileExpDetails = ({ item }) => {
  const history = useHistory();

  const dispatch = useDispatch();

  const expenses = useSelector(state => state.expenses);
  const { isDeleted } = expenses;

  if (isDeleted) return <Redirect to="/profile" />

  return (
    <tr className="align-middle text-dark main-global-table-box">
      <td className="p-6">{item?.title}</td>
      <td className="p-6">{item?.description}</td>
      <td className="p-6">{item?.amount}</td>
      <td className="p-6">
        {item?.createdAt && dateFormatter(item?.createdAt)}
      </td>
      <td className="p-6 custom-edit-delete-btn-box">
        <button
          onClick={() =>
            history.push({
              pathname: `/edit-expense`,
              state: {
                item,
              },
            })
          }
          className="badge bg-success-light text-success"
        >
          <i className="fa fa-edit"></i>
        </button>

        <button
          onClick={() =>
            dispatch(deleteExpAction(item._id))
          }
          className="badge bg-success-light text-success"
        >
          <i className="fa fa-trash"></i>
        </button>
      </td>
    </tr>
  );
};


export default UserProfileExpDetails;
