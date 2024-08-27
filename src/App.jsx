import "./App.css";
import Navbar from './Components/Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Footer from "./Components/Footer";
import ListInstances from "./Components/ListInstances";
import ListCourses from "./Components/ListCourses";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

function App() {

  return (
    <>
        <Router>
           <Navbar/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route exact path="/login" element={<Login/>} />
              <Route exact path="/signup" element={<Signup/>} />
              <Route exact path="/listinstances" element={<ListInstances/>} />
              <Route exact path="/listcourses" element={<ListCourses/>} />
            </Routes>
          </div>
          <Footer />
        </Router>
  </>
  )
}

export default App
