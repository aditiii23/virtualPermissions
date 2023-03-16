import "./App.css"
import Login from "./components/Login/Login"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Signup from "./components/Signup/Signup"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Signup />}></Route>
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  )
}

export default App
