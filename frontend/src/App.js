import "./App.css"
import Login from "./components/Login/login"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
