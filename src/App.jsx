import { Routes, Route } from "react-router-dom";
import "./App.css";
import "./components/UI.css";
import UI from "./components/UI";
import Quiz from "./components/Quiz";

function App() {
  return (
    <Routes>
      <Route path="/" element={<UI />} />
      <Route path="/quiz/:topic" element={<Quiz />} />
    </Routes>
  );
}

export default App;
