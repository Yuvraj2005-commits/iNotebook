import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import Navbar from "./Components/Navbar";
import NoteState from "./Context/Notes/NoteState"; // ✅ Import NoteState instead of NoteContext
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { useState } from "react"; 
import Alert from "./Components/Alert";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 500);
  }
  return (
    <>
      <NoteState>
        {" "}
        {/* ✅ Correct Provider */}
        <Router>
          <div>
            <Navbar />
            <Alert alert={alert} />
            <div className="container">
              <Routes>
                <Route path="/" element={<Home showAlert={setAlert} />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login showAlert={setAlert} />} />
                <Route path="/signup" element={<Signup  showAlert={setAlert} />} />
              </Routes>
            </div>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
