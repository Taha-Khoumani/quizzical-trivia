//Dependencies:
import { nanoid } from "nanoid";
import { shuffle } from "./functions";
//React:
export default function Question(props){
    const {question,correct_answer,incorrect_answers} = props.questionData
    const all_answers = shuffle([...incorrect_answers,correct_answer])
    const all_answers_elements = all_answers.map(answer => <button key={nanoid()}>{answer}</button>)
    return(
        <div>
            <p>{question}</p>
            {all_answers_elements}
        </div>
    )
}