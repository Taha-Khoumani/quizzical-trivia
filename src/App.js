//Hooks:
import { useEffect, useState } from "react";

//functions:
import { decodeEntities} from "./dependencies/functions.js";
import { nanoid } from "nanoid";
//custom components:
import ListOfQuestions from "./dependencies/ListOfQuestions.js";

//css:
import "./css/style.css"

//images:
import blue from "./dependencies/imgs/blue-shape.png";import beige from "./dependencies/imgs/beige-shape.png";

//React:
export default function App() {
  const [gameState,setGameState] = useState("landing-page")
  const [questionsData,setQuesionsData] = useState([])
  const [gameCount,setGameCount] = useState(0)
  //use-effect
  useEffect(()=>{
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
    .then(res => res.json())
    .then(data =>{ 
      console.log(data.results)
      setQuesionsData(data.results.map(question =>(
        {
          id:nanoid(),
          question:decodeEntities(question.question),
          incorrect_answers:question.incorrect_answers.map(i=>decodeEntities(i)),
          correct_answer:decodeEntities(question.correct_answer),
          user_answer:""
        }
      )))
    })
  },[gameCount])
  //event-handlers-functions:
  function handleClickLandingPage (){
    setGameState("test")
    setGameCount((prevGameCount)=>prevGameCount+1)
  }
  console.log(questionsData.map(x=>x.user_answer))
  return (
    <main>
      <section className="background">
        <img src={blue} alt="blue-shape" className="blue"/>
        <img src={beige} alt="beige-shape" className="beige" />
      </section>
      { 
        gameState === "landing-page" &&
        <section className="landing-page">
        {/* <p>{decodeEntities("&rdquo;&rdquo;In the Panic! At the Disco&#039;s song &quot;Nothern Downpour&quot;, which lyric follows &#039;I know the world&#039;s a broken bone&#039;.")}</p> */}
        <h1>Quizzical</h1>
        <p>Practice your general knowled while having fun .</p>
        <button 
          onClick={handleClickLandingPage}
        >Start quiz
        </button>
        </section>
      }
      {
        gameState === "test" &&
        <section className="test">
        <ListOfQuestions questionsData={questionsData} setAnswer={setQuesionsData}/>
        <button className="check-answers">Check answers</button>
        </section>
      }
    </main>
  ); 
}