import React from "react";
import page_not_found from "../img/notadmin.svg";


const PageNotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        margin: "20px",
      }}
    >
      <h1 className="text-danger">Page Not Found</h1>
      <img alt="PageNotFound" className=" img-fluid m-3" src={page_not_found} />
    </div>
  );
};

export default PageNotFound;
