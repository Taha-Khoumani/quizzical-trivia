import { useState } from "react";
//custom components
import ListOfQuestions from "./ListOfQuestions.js";
//css
import "./css/style.css"
//images
import blue from "./imgs/blue-shape.png";import beige from "./imgs/beige-shape.png";
//component
export default function App() {
  const [gameState,setGameState] = useState("landing-page")
  const [questionsData,setQuesionsData] = useState({})
  //event-handlers-functions:
  function handleClickLandingPage (){
    setGameState("test")
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(res => res.json())
      .then(data => setQuesionsData(data.results))
  }
  return (
    <main>
      <section className="background">
        <img src={blue} alt="blue-shape" className="blue"/>
        <img src={beige} alt="beige-shape" className="beige" />
      </section>
      { 
        gameState === "landing-page" &&
        <section className="landing-page">
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
        {/* <p>{JSON.stringify(questionsData)}</p> */}
        <ListOfQuestions questionsData={questionsData}/>
        <button>Check answers</button>
        </section>
      }
    </main>
  ); 
}