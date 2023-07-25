import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import "./Register.scss";
import { checkRegister, newUser } from "../../services/userService";
import { generateToken } from "../../helper/generateToken";
function Register() {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate()
  const openMessage = () => {
    messageApi.open({
      key: 1,
      type: "loading",
      content: "Loading...",
    });
    setTimeout(() => {
      messageApi.open({
        key: 1,
        type: "error",
        content: "Email đã tồn tại!",
        duration: 2,
      });
    }, 1000);
  };
  const handleFinsh = async (values) => {
    const { password, email, repassword, fullName } = values;
    const token = generateToken();
    const option = {
      fullName: fullName,
      email: email,
      password: password,
      token: token,
    };
    const response = await checkRegister(email);
    if (password === repassword && response.length === 0) {
      const response = await newUser(option);
      if (response) {
        navigate("/login");
      } else {
        openMessage();
        form.resetFields();
      }
    } else {
      openMessage();
      form.resetFields();
    }
  };
  return (
    <>
      {contextHolder}
      <div className="register">
        <Form
          size="large"
          onFinish={handleFinsh}
          form={form}
          autoComplete="off"
        >
          <Form.Item
            label="Fullname"
            required
            name={"fullName"}
            defaultValue=""
          >
            <Input placeholder="Họ và tên" />
          </Form.Item>
          <Form.Item label="Email" required name={"email"} defaultValue="">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Password"
            required
            name={"password"}
            defaultValue=""
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item
            label="Re-Enter Password"
            required
            name={"repassword"}
            defaultValue=""
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Đăng kí
            </Button>
            <Button type="primary" htmlType="reset">
              Reset
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
export default Register;
