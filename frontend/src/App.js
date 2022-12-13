import "./App.css"
import Profile from "./components/Profile/profile"
import Login from "./components/Login/login"
import Signup from "./components/Signup/signup"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Signup />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
