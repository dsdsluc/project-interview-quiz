import { Button, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getCookie } from "../../helper/cookie";
import { Link } from "react-router-dom";
import "./Information.scss"

function Information() {
    const userName = getCookie("fullName");
    console.log(userName)
  const items = [
    {
      key: 1,
      label: (
        <div className="notify__item">
          <div className="notify__content">
            <Link to={"/information"}>Xem trang cá nhân</Link>
          </div>
        </div>
      ),
    },

  ];
  return (
    <>
      <Dropdown placement="bottomLeft"
        menu={{ items }}
        trigger={["click"]}
        dropdownRender={(menus) => (
          <div className="notify">
            <div className="notify__head">
              <Button icon={<UserOutlined />}></Button>
              <span>{userName}</span>

            </div>
            <div className="notify__body">{menus}</div>
          </div>
        )}
      >
        <Button icon={<UserOutlined />}></Button>
      </Dropdown>
    </>
  );
}
export default Information;
