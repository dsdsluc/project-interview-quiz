import { Outlet, useNavigate } from "react-router-dom";
import { getCookie } from "../../helper/cookie";

function Private() {
  const token = getCookie("token");
  const navigate = useNavigate();
  return (
    <>
      {token.length > 0 ? <Outlet /> : navigate("/login")}
    </>
  );
}
export default Private;
