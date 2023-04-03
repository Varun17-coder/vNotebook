
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
// import Alert from './components/Alert';
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Signup from './components/Signup';
function App() {
  return (
    <div className="App">
      <NoteState>
       <Router>
       <Navbar/>
       {/* <Alert message="this is a vNotebook"/> */}
       <div className="container">
       <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/about" element={<About/>}/>
         <Route path="/login" element={<Login/>}/>
         <Route path="/signup" element={<Signup/>}/>
         </Routes>
         </div>
       </Router>
      </NoteState>
    </div>
  );
}

export default App;



// ContextAPI -- whatever the states we send in the context can be accessed by any component without passing the props component to component
