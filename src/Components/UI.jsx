import { useNavigate } from "react-router-dom";

export default function UI() {
  const navigate = useNavigate();

  function handleTopicClick() {
    navigate("/quiz/cybersecurity");
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
        <button onClick={handleTopicClick}>Cybersecurity</button>
      </div>
    </div>
  );
}
