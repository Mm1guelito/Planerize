import "./App.css";
import MainDashboard from "./components/MainDashboard/MainDashboard";
import MainStartUp from "./components/startup/main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainStartUp />} />
          <Route path="/main-dashboard" element={<MainDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
