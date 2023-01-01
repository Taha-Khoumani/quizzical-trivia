//Dependencies:
import { nanoid } from "nanoid";
import { shuffle } from "./functions";
//React:
export default function Question(props){
    const {question,correct_answer,incorrect_answers,id} = props.questionData
    const all_answers = shuffle([...incorrect_answers,correct_answer])
    var handleClick = function (id){
        return (function (event){
            console.log(event.target)
        })()
    }
    const all_answers_elements = all_answers.map(
        answer => 
            <button
                className="question-a"
                key={nanoid()}
                answertoquestion={id}
                onClick={(e)=>{
                    // console.log(e.target.innerText,id)
                    props.setAnswer(prevArr=> prevArr.map(q => q.id === id ? {...q,user_answer:e.target.innerText} : q ))
                }}
            >
                {answer}
            </button>
    )
    return(
        <div className="question" >
            <p className="question-q">{question}</p>
            <div className="list-of-a">
                {all_answers_elements}
            </div>
             <hr/>
        </div>
    )
}