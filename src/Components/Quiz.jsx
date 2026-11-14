import { useState } from "react";

export default function Quiz() {
   const questions = ["a", "b", "c", "d"];
   const [score, setScore] = useState(0);

   function handleAnswer(question) {
    console.log("Réponse choisie :", question);
    setScore(score + 1);
  }
  return (
    <div className="ui">
      <div className="terminal-bar">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="title">root@cschamp:~</span>
      </div>

      <div className="terminal-body">
        <h1>
          Welcome to csChamp<span className="cursor"></span>
        </h1>
        <h2 className="prompt">Choose a topic</h2>
        
        

       

        <ul>
          {questions.map((question, index) => (
            <li key={index}>
              <button onClick={() => handleAnswer(question)}>{question}</button>
            </li>
          ))}
        </ul>
        <h1>question</h1>
        <input type="text" className="input-field" placeholder="Type your answer..." />
        <button className="submit-button">Submit</button>

        <p className="score prompt">Score : {score}</p>
      </div>
    </div>
  );
}
  

  
        