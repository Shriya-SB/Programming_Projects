// Import all the files required to display in on server.
import Navbar from './Components/Navbar';
import TextForms from './Components/TextForms';
import About from './Components/About';
import React, { useState } from 'react';
import Alert from './Components/Alert';
// Import react router
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

// Adding router to make my page resistent against reloading when surffing from route to another.
function App() {
  const [mode, setMode] = useState('light'); // Whether dark mode is enabled or not
  const [alert, setAlert] = useState(null); // State variable of alert
  // Create an function of showAlert to give a form of alert.
  const showAlert = (message, type) => {
    // Define the alert consists of message and type (danger or success)
    setAlert({
      msg: message,
      type: type
    })
    // The alert should be disappear in 2 seconds
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }
  // To enable light and dark mode here is the function.
  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#042743';
      showAlert("Dark mode has been enabled", "success");
    }
    else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert("Light mode has been enabled", "success");
    }
  }
  return (
    // Give the function used in props.
    <>
      <Router>
        <Navbar title="TextAlchemy" mode={mode} toggleMode={toggleMode} key={new Date()} />
        <Alert alert={alert} />
        <div className="container my-3">
          <Routes>
            <Route exact path="/about" element={<About />} />
            <Route exact path="/" element={<TextForms showAlert={showAlert} heading="Try TextAlchemy - word counter, character counter, remove extra spaces" mode={mode} />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;