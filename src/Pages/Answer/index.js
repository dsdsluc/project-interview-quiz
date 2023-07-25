import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import { getListAnswer } from "../../services/answserService";
import { getCookie } from "../../helper/cookie";
import { getTopicList } from "../../services/topicService";
import { Link } from "react-router-dom";
import "./Answer.scss"

function Answer() {
  const [data, setData] = useState([]);
  const usedId = getCookie("id");
  const userName = getCookie("fullName");
  useEffect(() => {
    const fetchApi = async () => {
      let result = [];
      const listAnswers = await getListAnswer(usedId);
      const listTopic = await getTopicList();
      for (let i = 0; i < listAnswers.length; i++) {
        result.push({
          ...listAnswers[i],
          ...listTopic.find((item) => item.id === listAnswers[i].topicId),
          id: listAnswers[i].id,
        });
      }
      setData(result.reverse());
    };
    fetchApi();
  },[usedId]);
  console.log(data)

  const columns = [
    {
      title: "Id bai lam",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Chu de",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_,record)=>{
        return(
            <Link to={"/result/" + record.id}>
             <Button danger> Xem chi tiet</Button>
            </Link>
           
        )
      }
    },
  ];
  return (
    <>
      {data.length > 0 ? (
        <div className="answer">
            <h2>Kết quả bài làm của {userName} </h2>
          <Table dataSource={data} columns={columns} rowKey={"id"} />;
        </div>
      ) : (
        <>Dang load du lieu</>
      )}
    </>
  );
}
export default Answer;
