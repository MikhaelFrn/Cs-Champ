import { useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { reducer, initialState } from "../game/engine";
import { rateChoice } from "../game/answerValidator";

export default function Quiz() {
  const { topic } = useParams();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "START", scenarioId: topic });
  }, [topic]);

  if (state.status === "picking") {
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
            No scenario for "{topic}" yet<span className="cursor"></span>
          </h1>
          <p className="prompt">Check the console for details.</p>
        </div>
      </div>
    );
  }

  const currentNode = state.scenario.nodes[state.nodeId];
  const isEnding = state.status === "ending" || state.status === "gameover";
  const isCompromised = state.status === "gameover";

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
          {state.scenario.title}
          <span className="cursor"></span>
        </h1>

        <p className="prompt">
          Score : {state.score} &middot; Step {state.steps}
        </p>

        {state.lastDelta !== 0 && (
          <p className={`feedback ${rateChoice({ points: state.lastDelta })}`}>
            {state.lastDelta > 0 ? `+${state.lastDelta}` : state.lastDelta}
          </p>
        )}

        <p>{currentNode.text}</p>

        {currentNode.evidence && (
          <pre className="evidence-box">{currentNode.evidence}</pre>
        )}

        {isEnding ? (
          <div className={`end-screen ${isCompromised ? "compromised" : "safe"}`}>
            <h2 className="prompt">
              {isCompromised ? "Scenario failed" : "Scenario complete"}
            </h2>
            {currentNode.concept && <p>Concept: {currentNode.concept}</p>}
            <button onClick={() => navigate("/")}>Play again</button>
          </div>
        ) : (
          <ul>
            {currentNode.choices.map((choice, index) => (
              <li key={index}>
                <button onClick={() => dispatch({ type: "PICKING", id: index })}>
                  {choice.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
