import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../../../images/logo.png";
import { getCookie } from "../../../helper/cookie";
import { useSelector } from "react-redux";
import Information from "../../../components/Information";
function LayoutDefault() {
  const token = getCookie("token");
  const isLogin = useSelector((state) => state.authenReducer);
  console.log(isLogin);

  return (
    <>
      <header className="header">
        <div className="header__logo">
          <Link to={"/"}>
            <img src={logo} alt="logo" />
          </Link>
        </div>
        {token && (
          <div className="header__menu">
            <ul>
              <li>
                <NavLink to={"/"}>Home</NavLink>
              </li>
              <li>
                <NavLink to={"/topic"}>Topic</NavLink>
              </li>
              <li>
                <NavLink to={"/answer"}>Answer</NavLink>
              </li>
            </ul>
          </div>
        )}

        <div className="header__meta">
          <ul>
            {token.length > 0 ? (
              <>
                <li>
                  <Information />
                </li>
                <li>
                  <Link to={"/logout"}>Logout</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={"/login"}>Login</Link>
                </li>
                <li>
                  <Link to={"/register"}>Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="footer">Copyright @ by Hà Minh Phương</footer>
    </>
  );
}
export default LayoutDefault;
