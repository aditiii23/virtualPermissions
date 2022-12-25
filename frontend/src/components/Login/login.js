import React, { useState, useEffect } from "react"
import basestyle from "../base.module.css"
import loginstyle from "./login.module.css"
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
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i
    if (!values.email) {
      error.email = "Email is required"
    } else if (!regex.test(values.email)) {
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
      setError("")
      const res = await axios.post(
        "https://backend-aditiii23.vercel.app/users/login/",
        user
      )
      if (res.data.user && res.data.token) {
        localStorage.setItem("user", JSON.stringify(res.data.user))
        localStorage.setItem("token", res.data.token)
        navigate("/profile")
      } else {
        throw new Error("Invalid login")
      }
    } catch (err) {
      if (err.response) {
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
    </div>
  )
}
export default Login
