import About from "./components/About";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NoteState from "./context/notes/NoteState";
// import AddNote from "./components/AddNote";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Alert from "../src/components/Alert";
import { useState } from "react";
// This is my app initiallized from git.
function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    }) 
    // Give alert.
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }
  return (
    // Add router so that the page dosn't reload.
    <>
      <Router>
        <Navbar showAlert={showAlert}/>
        <Alert alert={alert} />
        <NoteState showAlert={showAlert}>
          <Routes>
            <Route exact path="/about" element={<About />} />
            <Route exact path="/" element={<Home showAlert={showAlert} />} />
            <Route exact path="/login" element={<Login showAlert={showAlert} />} />
            <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
          </Routes>
        </NoteState>
      </Router>
    </>
  );
}

export default App;