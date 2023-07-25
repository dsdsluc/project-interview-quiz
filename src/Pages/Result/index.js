import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAnswer } from "../../services/answserService";
import { getListQuestion } from "../../services/questionService";
import { getTopic } from "../../services/topicService";
import "./Result.scss";
function Result() {
  const params = useParams();
  const [data, setData] = useState([]);
  const [infor, setInfor] = useState();
  useEffect(() => {
    const fetchApi = async () => {
      const dataAnswer = await getAnswer(params.id);
      const dataQuestion = await getListQuestion(dataAnswer.topicId);
      const title = await getTopic(dataAnswer.topicId);
      let infor = {
        countCorrect: 0,
        countFalse: 0,
        countTotal: 0,
        topicName: title.name,
        topicId: title.id,
      };

      let result = [];
      for (let i = 0; i < dataQuestion.length; i++) {
        result.push({
          ...dataAnswer.answers.find(
            (item) => parseInt(item.questionId) === dataQuestion[i].id
          ),
          ...dataQuestion[i],
        });
      }
      for (let i = 0; i < result.length; i++) {
        if (parseInt(result[i].answer) === result[i].correctAnswer) {
          infor.countCorrect++;
          infor.countTotal++;
        } else {
          infor.countFalse++;
          infor.countTotal++;
        }
      }
      setData(result);
      setInfor(infor);
    };
    fetchApi();
  }, [params.id]);
  console.log(data, infor);
  return (
    <>
      {data.length > 0 ? (
        <div className="result">
          <div className="result__title">
            <h2>Kết quả của bài test {infor.topicName}:</h2>
            <div className="result__detail">
              <span>Đúng : {infor.countCorrect}</span>
              <span>Sai : {infor.countFalse}</span>
              <span>Tổng số câu : {infor.countTotal}</span>
              <span>
                Phần trăm đúng :{" "}
                {((infor.countCorrect / infor.countTotal) * 100).toFixed(0)}%
              </span>
            </div>
          </div>
          <div className="result__quiz">
            {data.map((item, index) => {
              return <div className="result__item" key={item.id}>
                <p>Câu {index + 1}: {item.question}</p>
                <div className="result__selections">
                    {item.answers.map((selection, ind)=>{
                        let check = false;
                        let className = ""
                        if(ind === parseInt(item.answer)){
                            check= true;
                            className = "selection-false"
                        }
                        if(ind === item.correctAnswer){
                            className= "selection-right"
                        }
                        return(
                            <div key={ind} className="result__label">  
                                <input type="radio" defaultChecked={check} disabled/>
                                <label className={className}>{selection}</label>
                            </div>
                        )
                    })}
                </div>
              </div>;
            })}
            <Link to={"/question/" + data[0].topicId}>
            <button className="button">Làm lại</button>
            </Link>
            
          </div>
        </div>
      ) : (
        <>Đang xử lý dữ liệu</>
      )}
    </>
  );
}
export default Result;
