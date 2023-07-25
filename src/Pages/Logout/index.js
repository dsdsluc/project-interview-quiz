import { useNavigate } from "react-router-dom";
import { deleteAllCookies } from "../../helper/cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authen } from "../../action/authen";
function Logout (){
    const navigate = useNavigate();
    const dispatch = useDispatch()
    deleteAllCookies();
    useEffect(()=>{
        navigate("/login");
        dispatch(authen(false));
    },[navigate, dispatch])
    
    return(
        <>
             
        </>
    )
}
export default Logout;