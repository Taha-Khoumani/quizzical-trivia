//custom components
import Question from "./Question"
import { nanoid } from "nanoid"
export default function ListOfQuestions(props){
    const ListOfQestions = props.questionsData.map(question => <Question key={nanoid()} questionData={question}/>)
    return(
        <div>
            {ListOfQestions}
        </div>
    )
}