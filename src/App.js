import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';
import Navbar from './Components/Navbar';
import NoteState from './Context/Notes/NoteState'; // ✅ Import NoteState instead of NoteContext

function App() {
  return (
    <>
    <NoteState> {/* ✅ Correct Provider */}
      <Router>
        <div>
          <Navbar />
          <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        </div>
      </Router>
    </NoteState>
    </>
  );
}

export default App;
