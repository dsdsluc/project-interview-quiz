import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getListQuestion } from "../../services/questionService";
import { getTopic } from "../../services/topicService";
import { getCookie } from "../../helper/cookie";
import { postNewAnswer } from "../../services/answserService";
import "./Question.scss"
function Question() {
  const param = useParams();
  const userId = getCookie("id");
  const navigate = useNavigate()
  const [data, setData] = useState([]);
  const [title, setTitle] = useState();
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListQuestion(param.id);
      const title = await getTopic(param.id);
      setData(response);
      setTitle(title);
    };
    fetchApi();
  }, [param.id]);
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const selectAnswers = [];
    for(let i =0 ; i < e.target.elements.length; i++){
        if(e.target.elements[i].checked === true){
            selectAnswers.push(
                {
                    questionId: e.target.elements[i].name,
                    answer: e.target.elements[i].value
                }
            )
        }
        
    }
    const option = {
        userId: userId,
        topicId: title.id,
        answers: selectAnswers
    }
    const response = await postNewAnswer(option);
    if(response){
        navigate("/result/"+ response.id);
    }
    else{
        alert("Nộp bài không thành công")
    }
  }
  
  return (
    <>
      {data.length > 0 ? (
        <div className="quiz-question">
          <div className="quiz-question__title">
            {title !== undefined && <h2>Chủ đề của bài quiz : {title.name}</h2>}
          </div>
          <div className="quiz-question__form">
            <form onSubmit={handleSubmit}>
                {data.map((item,index )=>(
                    <div className="quiz-question__item" key={item.id}>
                        <p>Câu {index + 1} : {item.question} </p>
                        {item.answers.map((answer, ind)=>(
                            <div key={ind} className="quiz-question__selections">
                                <input type="radio" name={item.id} value={ind} id={`quiz-${item.id}-${ind}`} required/>
                                <label htmlFor={`quiz-${item.id}-${ind}`}>{answer}</label>
                            </div>
                        ))}
                    </div>
                ))}
                  <button className="button" >Nop bai</button>
            </form>
          </div>
        </div>
      ) : (
        <>Đang load dữ liệu</>
      )}
    </>
  );
}
export default Question;
