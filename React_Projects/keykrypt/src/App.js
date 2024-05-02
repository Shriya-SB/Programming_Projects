import './App.css';
import Footer from './components/Footer';
import LoginForm from './components/Login';
import Manager from './components/Manager';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignupForm from './components/Signup';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Manager />} />
          <Route exact path='/login' element={<LoginForm />} />
          <Route exact path='/signup' element={<SignupForm />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;