import React, { useState } from "react"
import { toast } from "react-toastify"
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

  const changeHandler = (e) => {
    const { name, value } = e.target
    setUserDetails((prevState) => {
      return {
        ...prevState,
        [name]: value,
      }
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
    const err = validateForm(user)
    setFormErrors(err)
    try {
      if (Object.keys(err).length < 1) {
        let res = await axios.post(`${apiUrl}/users/login`, user)
        if (res.data.user && res.data.token) {
          localStorage.setItem("user", JSON.stringify(res.data.user))
          localStorage.setItem("token", res.data.token)
          navigate("/profile")
        }
      }
    } catch (err) {
      const res = err?.response?.data
      toast.error(res?.message)
    }
  }

  return (
    <div className={loginstyle.login}>
      <form className={loginstyle.loginform}>
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
      <NavLink to="/register">Not yet registered? Register Now</NavLink>
    </div>
  )
}
export default Login
