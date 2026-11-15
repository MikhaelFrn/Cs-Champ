import { useNavigate } from "react-router-dom";
import { scenarios } from "../game/scenarios";

export default function UI() {
  const navigate = useNavigate();

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
        <h2 className="prompt">Choose an incident</h2>
        <ul>
          {scenarios.map((scenario) => (
            <li key={scenario.id}>
              <button onClick={() => navigate(`/quiz/${scenario.id}`)}>
                {scenario.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
