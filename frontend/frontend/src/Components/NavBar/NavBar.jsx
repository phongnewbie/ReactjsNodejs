import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../../redux/apiRequest";
import { createAxios } from "../../redux/createInstance";
import { logoutSuccess } from "../../redux/auth";
import Product from "../ProductHome/Product";
export default function NavBar() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const [input, setInput] = useState("");
  const [data, setData] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const dispatch = useDispatch();
  const accessToken = user?.accessToken;
  const id = user?._id;
  const navigate = useNavigate();
  let axiosJWT = createAxios(user, dispatch, logoutSuccess);
  const handlelogout = () => {
    logOut(dispatch, id, navigate, accessToken, axiosJWT);
  };

  return (
    <nav className="navbar-container">
      <div className="flex bg-slate-100">
        <div className="container container_flex flex">
          <a href="" className="bg-slate-100">
            <img
              style={{ width: "250px" }}
              src="data:image/png;base64,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"
              alt=""
            />
          </a>
          <div className="theme-switch">
            <input type="checkbox" id="theme-checkbox" />
            <label for="theme-checkbox">
              <div></div>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"></path>
                </svg>
              </span>
            </label>
          </div>
        </div>
        <div>
          {user ? (
            <>
              <div className="flex">
                <div className="mr-16">
                  <div>
                    <p>xin chào : {user.username}</p>
                  </div>
                  <Link to={"/login"} onClick={handlelogout}>
                    LogOut
                  </Link>
                </div>
                <div>
                  <Link to={"/ContactAdmin"}>Góp Ý</Link>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex mr-28 ">
                <div className="flex mr-24 mt-4">
                  <Link className="" to={"/login"}>
                    Login
                  </Link>
                  <Link className=" ml-3" to={"/register"}>
                    REGISTER
                  </Link>
                </div>
                <a className="ml-5 w-40 float-right mt-6 text-red-600" href="">
                  Bạn Cần giúp đỡ?
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
