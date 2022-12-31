//custom components
// import Question from "./Question"
// import { nanoid } from "nanoid"
export default function ListOfQuestions(props){
    // let ListOfQestions = props.questionsData.map(question => <Question key={nanoid} questionData={question} />)
    // let ListOfQestions = props.questionsData.map(question => <p>{question.question}</p>)
    // console.log(ListOfQestions)
    let x = JSON.stringify(props.questionsData[0].question)  
    return(
        <div>
            {/* {ListOfQestions} */}
            <p>{x}</p>
        </div>
    )
}