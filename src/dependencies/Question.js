//Dependencies:
import { nanoid } from "nanoid";
//React:
export default function Question(props){
    const {question,id,all_answers} = props.questionData
    const clickedStyles = {
        //clicked
        backgroundColor:"#D6DBF5",
        borderWidth:0,

        //correct
        // backgroundColor:"#94D7A2",

        //false
        // backgroundColor:"#F8BCBC",
        
        //     //both
        //     borderWidth:"0",
        //     opacity:"0.5",
    }
    
    const all_answers_elements = all_answers.map(
        answer => 
            <button
                className="question-a"
                key={nanoid()}
                answertoquestion={id}
                onClick={(e)=>{
                    props.setAnswer(prevArr=> prevArr.map(q => q.id === id ? {...q,user_answer:e.target.innerText} : q ))
                }}
                style={props.gameState === "test" ? (props.questionData.user_answer === answer ? clickedStyles : {}) : (
                    props.questionData.correct_answer === answer ?
                        {backgroundColor:"#94D7A2",borderWidth:"0"} : 
                        ( answer === props.questionData.user_answer ? {borderWidth:"0",opacity:"0.5",backgroundColor:"#F8BCBC"} : {opacity:"0.5"})
                )}
                // style={
                //     if(props.gameState === "test"){props.questionData.user_answer === answer ? clickedStyles : {}}
                // }
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