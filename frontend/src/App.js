import "./App.css"
import Login from "./components/Login/Login"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Signup from "./components/Signup/Signup"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Signup />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
