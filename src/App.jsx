import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./Components/UI.css";
import UI from "./Components/UI";
import Quiz from "./Components/Quiz";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UI />} />
      <Route path="/quiz/:topic" element={<Quiz />} />
    </Routes>
  );
}

export default App;
