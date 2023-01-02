//custom components
import Question from "./Question"
import { nanoid } from "nanoid"
export default function ListOfQuestions(props){
    const ListOfQestions = props.questionsData.map(
        (question,i,a) =>
            <Question 
                key={nanoid()} 
                questionData={question}
                setAnswer={props.setAnswer}
                gameState={props.gameState}
            />
    )
    return(
        <div className="list-of-questions" >
            {ListOfQestions}
        </div>
    )
}