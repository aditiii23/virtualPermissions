import appstyle from "./App.module.css"
import Login from "./components/Login/Login"
import { BrowserRouter, useNavigate, Routes, Route } from "react-router-dom"
import Signup from "./components/Signup/Signup"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"
import Header from "./components/Header/Header"
import { reducer, initialState } from "./reducers/userReducer"
import React, { useEffect, createContext, useReducer, useContext } from "react"

export const UserContext = createContext()

const Routing = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useContext(UserContext)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))

    if (user) {
      dispatch({ type: "USER", payload: user })
      navigate("/")
    } else {
      navigate("/register")
    }
  }, [])
  return (
    <>
      <Routes>
        <Route path="/"></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Signup />}></Route>
      </Routes>
      <ToastContainer />
    </>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <div
        className={appstyle.App}
      >
        <BrowserRouter>
          <Header />
          <Routing />
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  )
}

export default App
