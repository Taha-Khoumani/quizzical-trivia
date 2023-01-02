//Hooks:
import { useEffect, useState } from "react";

//functions:
import { decodeEntities,shuffle} from "./dependencies/functions.js";
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
  const [category,setCategory] = useState("")
  //use-effect
  useEffect(()=>{
    fetch(category === "all" ? "https://opentdb.com/api.php?amount=5&type=multiple" : (category === "anime" ? "https://opentdb.com/api.php?amount=5&category=31&type=multiple" : "https://opentdb.com/api.php?amount=5&category=15&type=multiple"))
    .then(res => res.json())
    .then(data =>{ 
      setQuesionsData(data.results.map(question =>(
        {
          id:nanoid(),
          question:decodeEntities(question.question),
          // incorrect_answers:question.incorrect_answers.map(i=>decodeEntities(i)),
          correct_answer:decodeEntities(question.correct_answer),
          all_answers:shuffle([decodeEntities(question.correct_answer),...question.incorrect_answers.map(x=>decodeEntities(x))]),
          user_answer:""
        }
      ))) 
    })
  },[gameCount,category])
  //event-handlers-functions:
  function handleClickLandingPage (){
    if(category){
      setGameState("test")
      setGameCount((prevGameCount)=>prevGameCount+1)
    }
  }
  console.log(category)
  return (
    <main>
      <section className="background">
        <img src={blue} alt="blue-shape" className={gameState === "landing-page" ? "blue" : "blue quizz-time"}/>
        <img src={beige} alt="beige-shape" className={gameState === "landing-page" ? "beige" : "beige quizz-time"} />
      </section>
      { 
        gameState === "landing-page" &&
        <section className="landing-page">
        {/* <p>{decodeEntities("&rdquo;&rdquo;In the Panic! At the Disco&#039;s song &quot;Nothern Downpour&quot;, which lyric follows &#039;I know the world&#039;s a broken bone&#039;.")}</p> */}
        <h1>Quizzical</h1>
        <p>Develop your general knowledge, all while having fun ;)</p>
        <form>
          <h3>Chose your category:</h3>
          <input type="radio" value="anime" id="anime" name="category" onChange={()=>{setCategory("anime")}} checked={category === "anime"}/>
          <label htmlFor="anime">Anime</label><br />
          <input type="radio" value="games" id="games" name="category" onChange={()=>{setCategory("games")}} checked={category === "games"} />
          <label htmlFor="games">Games</label><br />
          <input type="radio" value="all" id="all" name="category" onChange={()=>{setCategory("all")}} checked={category === "all"} />
          <label htmlFor="all">All</label>
        </form>
        <button 
          onClick={handleClickLandingPage}
        >Start quiz
        </button>
        </section>
      }
      {
        (gameState === "test" || gameState === "results") &&
        <section className="test">
        <ListOfQuestions questionsData={questionsData} setAnswer={setQuesionsData} gameState={gameState}/>
        <div className="footer">
          { gameState === "results" && <p>You scored {questionsData.map(q => q.correct_answer === q.user_answer ? 1 : 0).reduce((a, b) => a + b,0)}/5 correct answers </p>}
          <button 
            className="check-answers"
            onClick={()=>{
              if((questionsData.every(q => q.user_answer !== "" )) && gameState === "test"){setGameState("results")}
              else if(gameState === "results") {setGameCount(n=> n+1);setGameState("test")}

            }}
          >
            {gameState === "test" ? "Check answers" : "Play again"}
          </button>
        </div>
        </section>
      }
    </main>
  ); 
}