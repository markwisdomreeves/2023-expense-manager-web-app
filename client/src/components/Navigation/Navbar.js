import React from "react";
import { useSelector } from "react-redux";
import AdminNavbar from "./Admin/AdminNavbar";
import PrivateNavbar from "./Private/PrivateNavbar";
import PublicNavbar from "./Public/PublicNavbar";


const Navbar = () => {
  const userLogin = useSelector(state => state?.users?.userAuth);
  const userAdmin = useSelector(state => state?.users?.userAuth?.isAdmin);

  return (
    <>
      {userAdmin ? (
        <AdminNavbar />
      ) : userLogin ? (
        <PrivateNavbar />
      ) : (
        <PublicNavbar />
      )}
    </>
  )
};


export default Navbar;
