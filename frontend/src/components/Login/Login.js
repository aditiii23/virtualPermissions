import React, { useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import basestyle from "../Base.module.css"
import loginstyle from "./Login.module.css"
import { apiUrl } from "../../services/config"
import axios from "axios"
import { useNavigate, NavLink } from "react-router-dom"
const Login = () => {
  const navigate = useNavigate()
  const [formErrors, setFormErrors] = useState({})
  const [user, setUserDetails] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")

  const changeHandler = (e) => {
    const { name, value } = e.target
    setUserDetails({
      ...user,
      [name]: value,
    })
  }
  const validateForm = (values) => {
    const error = {}
    const emailRegex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i
    if (!values.email) {
      error.email = "Email is required"
    } else if (!emailRegex.test(values.email)) {
      error.email = "Please enter a valid email address"
    }
    if (!values.password) {
      error.password = "Password is required"
    }
    return error
  }

  const loginHandler = async (e) => {
    e.preventDefault()
    setFormErrors(validateForm(user))
    try {
      const error = {}
      const emailRegex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i
      if (!user.email) {
        error.email = "Email is required"
        return
      } else if (!emailRegex.test(user.email)) {
        error.email = "Please enter a valid email address"
        return
      }
      if (!user.password) {
        error.password = "Password is required"
        return
      }
      let res = await axios.post(`${apiUrl}/users/login`, user)
      // toast.success("Login successful!")
      if (res.data.user && res.data.token) {
        localStorage.setItem("user", JSON.stringify(res.data.user))
        localStorage.setItem("token", res.data.token)
        navigate("/profile")
      } else {
        return error
      }
    } catch (err) {
      let res = err?.response?.data
      if (res.message === "No user exists! Please Register") {
        toast.error("No user exists! Please Register")
      } else if (res.message === "Wrong Password") {
        toast.error("Wrong Password")
      } else if (res.message) {
        toast.error("Invalid Login")
      } else if (err.response) {
        setError(err.response.data)
      }
    }
  }

  return (
    <div className={loginstyle.login}>
      <form>
        <h1>Login</h1>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={changeHandler}
          value={user.email}
        />
        <p className={basestyle.error}>{formErrors.email}</p>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={changeHandler}
          value={user.password}
        />
        <p className={basestyle.error}>{formErrors.password}</p>
        <button className={basestyle.button_common} onClick={loginHandler}>
          Login
        </button>
      </form>
      {error?.length > 0 && <div>{error}</div>}
      <NavLink to="/register">Not yet registered? Register Now</NavLink>
      <ToastContainer />
    </div>
  )
}
export default Login
