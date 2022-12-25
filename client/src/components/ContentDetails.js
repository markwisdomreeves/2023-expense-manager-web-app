import React from "react";
import currencyFormatter from "../utils/cuurencyFormatter";
import dateFormatter from "../utils/dateFormatter";


const ContentDetails = ({ item }) => {

  return (
    <>
      <tr className="align-middle text-dark main-global-table-box">
        <th className="p-6" scope="row">
          {item?.user?.firstname} {item?.user?.lastname}
        </th>
        <td className="">{item?.title}</td>
        <td className="p-6">{item?.description}</td>
        <td className="p-6">{currencyFormatter("USD", item?.amount)}</td>
        <td className="p-6">
          {item?.createdAt && dateFormatter(item?.createdAt)}
        </td>
      </tr>
    </>
  );
};


export default ContentDetails;
