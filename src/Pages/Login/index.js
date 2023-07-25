import { Button, Form, Input, message  } from "antd";
import { useNavigate } from "react-router-dom"
import { checkLogin } from "../../services/userService";
import { setCookie } from "../../helper/cookie";
import { useDispatch, useSelector } from "react-redux";
import "./Login.scss"
import { authen } from "../../action/authen";
function Login() {
    const navigate = useNavigate();
    const isLogin = useSelector(state=>state.authenReducer);
    console.log(isLogin);
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch()
    
    const handleFinish  = async (values) =>{
        const {email, password } = values;
        const response = await checkLogin(email,password);
        if(response.length === 1){
            const {fullName,email,password,token,id}=response[0];
            const time=1;
            setCookie("id",id,time);
            setCookie("fullName",fullName,time);
            setCookie("email",email,time);
            setCookie("password",password,time);
            setCookie("token",token,time);
            navigate("/");
            dispatch(authen(true));
        }
        else{
            const openMessage = () => {
                messageApi.open({
                  key : "1",
                  type: 'loading',
                  content: 'Loading...',
                });
                setTimeout(() => {
                  messageApi.open({
                    key : "1",
                    type: 'error',
                    content: 'Email hoắc mật khẩu không đúng!',
                    duration: 2,
                  });
                }, 1000);
              };
            openMessage();
        }
    }
  return (
    <>
     {contextHolder}
      <div className="login-form">
        <h2>Login</h2>
        <Form onFinish={handleFinish} size="large" autoComplete="off">
          <Form.Item label="Email" required name={"email"}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" required name={"password"}>
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
export default Login;
