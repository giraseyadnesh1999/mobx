import React, { Fragment, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import profilePic from "../../images/profile-photo.png";
import RCPlogo from "../../images/RCP-logo.svg";
import { useDispatch } from "react-redux";
import { fetchUserProfile, refreshToken } from "../../redux/action/userAction";
import jwt_decode from "jwt-decode";
import { AppDispatch } from "../../redux/store";
import { roleName, getToken } from "./auth/authUser";
import { Permissions } from "../../constants/PermissionConstant";
import SecureLS from "secure-ls";
import { useStore } from "../../Hooks/useStore";
function Component_Header() {
  // get urlPath name
  const {
    rootStore: { loginStore },
  } = useStore();
  const location = useLocation();
  const ls: any = new SecureLS();
  const dispatch = useDispatch<AppDispatch>();
  const tokenString: any = getToken();
  var decoded: any = jwt_decode(tokenString);
  const navigate = useNavigate();

  useEffect(() => {
    if (decoded.exp * 1000 < Date.now()) {
      refreshTokenFun();
    }
  }, [decoded.exp, location, ls, navigate]);

  const refreshTokenFun = async () => {
    var tokenData = ls?.get("refreshtoken");

    const tokenString: any = { token: tokenData?.data };
    // dispatch(refreshToken(tokenString));
    console.log(tokenString,"dtring")
    loginStore.fetchreffreshToken(tokenString)
  };

  const data: any = { search: decoded?.email };

  const profileFun = async () => {
    const profileData: any = await dispatch(fetchUserProfile(data));

    var Name: any = profileData?.payload?.[0]?.name;
    ls?.set("username", { data: Name });
    ls?.set("userImg", { data: profileData?.payload?.[0]?.image });
  };
  const fullName = ls?.get("username")?.data;
  const profileImage: any = ls?.get("userImg")?.data;
  
  useEffect(() => {
    profileFun();
  }, []);

  return (
    <Fragment>
      <header>
        <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-blue">
          <Link className="navbar-brand mr-auto mr-lg-5" to="/dashboard">
            <img src={RCPlogo} alt="RCP logo" />{" "}
          </Link>
          <button
            className="navbar-toggler p-0 border-0"
            type="button"
            data-toggle="offcanvas"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="navbar-collapse offcanvas-collapse"
            id="navbarsExampleDefault"
          >
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link
                  className={`nav-link  ${
                    location?.pathname === "/dashboard" ? "active" : ""
                  }`}
                  to="/dashboard"
                >
                  Dashboard <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item ">
                <Link
                  className={`nav-link  ${
                    location?.pathname === "/reusableComponent" ? "active" : ""
                  }`}
                  to="/reusableComponent"
                >
                  Reusable Components
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  Ideation Portal
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  Analytics
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="#">
                  Forum
                </Link>
              </li>
            </ul>
          </div>
          {/* 
      <!-- User Menu--> */}
          <div className="userprofile_wrapper my-2 my-lg-0">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="userprofile">
                    <img
                      src={
                        profileImage === undefined || profileImage === null
                          ? profilePic
                          : `data:image/jpeg;base64,${profileImage}`
                      }
                      className="rounded-circle objectfit_cover"
                      alt="user profile"
                    />
                  </span>
                  <span className="userprofilename">{fullName}</span>
                </Link>
                <div className="dropdown-menu dropdown-menu-right">
                  <Link className="dropdown-item active" to="#">
                    <i className="las la-icons"></i>Create New Component
                  </Link>
                  <Link className="dropdown-item" to="#">
                    <i className="las la-lightbulb"></i>Create New Idea
                  </Link>

                  {roleName() === Permissions.Admin ? (
                    <Fragment>
                      {" "}
                      <Link className="dropdown-item" to="/Manage_Role">
                        <i className="las la-cog"></i>Manage Roles
                      </Link>
                      <Link className="dropdown-item" to="/AssignPermissions">
                        <i className="las la-user"></i>Assign Permissions
                      </Link>
                    </Fragment>
                  ) : (
                    ""
                  )}
                  <Link className="dropdown-item" to="/logout">
                    <i className="las la-sign-out-alt"></i>Logout
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </Fragment>
  );
}

export default Component_Header;
