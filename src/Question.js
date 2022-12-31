export default function Question(props){
    const [question] = props.questionData
    return(
        <div>
            <p>{question}</p>
        </div>
    )
}