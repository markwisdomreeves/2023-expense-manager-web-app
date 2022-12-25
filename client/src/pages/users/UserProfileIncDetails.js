import React, { useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { deleteIncAction } from "../../redux/slices/income/incomeSlices";
import dateFormatter from "../../utils/dateFormatter";
import { useDispatch, useSelector } from "react-redux";


const UserProfileIncDetails = ({ item }) => {
  const history = useHistory();

  const dispatch = useDispatch();

  const income = useSelector(state => state.income);
  const { isDeleted } = income;

  useEffect(() => {
    if (isDeleted) return <Redirect to="/profile" />
  })

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
              pathname: `/edit-income`,
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
            dispatch(deleteIncAction(item._id))
          }
          className="badge bg-success-light text-success"
        >
          <i className="fa fa-trash"></i>
        </button>
      </td>
    </tr>
  );
};


export default UserProfileIncDetails;
