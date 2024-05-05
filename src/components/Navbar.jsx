import React from "react";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Modal from "./Modal";
import Profile from "./Profile";
import logo from "/logo.jpg"

const Navbar = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

  return (
    <nav className="bg-blue-500 p-4 fixed top-0 left-0 right-0 z-10 flex items-center justify-between">
      <div className="flex items-center">
        <img
          className="h-8 mr-2"
          src={logo}
          alt="Logo"
        />
        <span className="text-white text-lg font-semibold">Qviq</span>
      </div>
      <div className="mx-5 flex">
        <button className="btn mx-12 btn-warning" onClick={()=>navigate('/userCreation')}>Add Your Profile</button>
         {/* Profile menu */}
         {user ? <Profile user={user}/> : (
            <button
              onClick={() => document.getElementById("my_modal_5").showModal()}
              className="btn bg-green rounded-full px-6  flex items-center gap-2"
            >
              <FaRegUser /> Login
            </button>
          )}
          <Modal />
      </div>
    </nav>
  );
};

export default Navbar;
