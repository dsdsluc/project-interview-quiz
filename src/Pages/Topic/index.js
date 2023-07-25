import { useEffect, useState } from "react";
import { getTopicList } from "../../services/topicService";
import { Button, Table } from "antd";
import { Link } from "react-router-dom";
import "./Topic.scss";

function Topic() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getTopicList();
      setData(response);
    };
    fetchApi();
  }, []);
  console.log(data);
  const columns = [
    {
      title: "Số thứ tự",
      dataIndex: "id",
      key: "id",
      align: "center"
    },
    {
      title: "Tên chủ đề",
      dataIndex: "name",
      key: "name",
      align: "center"
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => {
        return (
          <Link to={"/question/" + record.id}>
            <Button>Làm bài</Button>
          </Link>
        );
      },
    },
  ];
  return (
    <>
      {data.length > 0 ? (
        <div className="topic-list">
          <Table
            dataSource={data}
            columns={columns}
            rowKey={"id"}
            pagination={false}
          />
        </div>
      ) : (
        <>Dang load du lieu</>
      )}
    </>
  );
}
export default Topic;
