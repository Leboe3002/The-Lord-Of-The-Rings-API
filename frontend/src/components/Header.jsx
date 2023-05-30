import React, { useState, useEffect } from "react";
import { getUserInfo } from "../helpers/api";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

const Headers = {
  '/'             : 'The One API',
  "/sign-up"      : "Sign up",
  "/about"        : "About",
  "/documentation": "Documentation",
  "/login"        : "Login",
  "/account"      : "Account"
}

const Header = () => {
  const { addToast } = useToasts();
  const history = useHistory();
  const location = useLocation();

  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [headerText, setHeaderText] = useState();
  const [isHomePage, setIsHomePage] = useState(location.pathname === "/");



  useEffect(() => {
    setHeaderText(Headers[location.pathname])
    getUserInfo().then(setUserInfo)
    setLoading(false);
    setIsHomePage(location.pathname === "/")
  }, [location.pathname]);

  async function logout(e) {
    e.preventDefault();
    try {
      document.cookie = "lotr-api=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      addToast("Logout successful", { appearance: "success" });
      history.push("/login");
    } catch (e) {
      addToast(e, { appearance: "error" });
    }
  }

  if (loading) return <span>Loading..</span>;



  return (
    <header className="sticky row">
      <div className="col-sm-6 logo">{!isHomePage && <Link to="/">The One API</Link>}</div>
      <div style={{ textAlign: "right" }} className="col-sm-6">
        <label htmlFor="drawer-control" className="drawer-toggle persistent" />
      </div>

      <div id="flexy" className="col-sm-12 col-md-2 col-lg-3"/>
      <div style={{ padding:"20px"}} className="col-sm-12 col-md-8 col-lg-6">
        <h1>{ headerText }</h1>
        {isHomePage &&<div className="subtitle">to rule them all</div>}
      </div>
      <div className="col-sm-12 col-md-2 col-lg-3"/>

      <input type="checkbox" id="drawer-control" className="drawer persistent" />
      <div id="drawer">
        <label htmlFor="drawer-control" className="drawer-close" />
        <nav>
          <Link to="/">home</Link>
          <br />
          <Link to="/about">about</Link>
          <br />
          <Link to="/documentation">documentation</Link> <br />
          {userInfo && (
            <>
              <br /> <Link to="/account">account</Link>
              <br />
              <a onClick={(e) => logout(e)} href="/">
                logout
              </a>{" "}
              <br />
            </>
          )}
          {!userInfo && (
            <>
              <Link to="/login">login</Link>
              <br />
              <Link to="/sign-up">sign up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
