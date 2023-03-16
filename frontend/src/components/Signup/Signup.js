import React, { useState } from "react"
import { toast } from "react-toastify"
import basestyle from "../Base.module.css"
import registerstyle from "./Signup.module.css"
import { apiUrl } from "../../services/config"
import axios from "axios"

import { useNavigate, NavLink } from "react-router-dom"
const Signup = () => {
  const navigate = useNavigate()

  const [formErrors, setFormErrors] = useState({})
  const [user, setUserDetails] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmpwd: "",
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
    const phoneRegex = /^\+?\d{1,3}[- ]?\d{3}[- ]?\d{3}[- ]?\d{4}$/
    values.email = values.email.toLowerCase()
    if (!values.name) {
      error.name = "Name is required"
    }
    if (!values.phone) {
      error.phone = "Phone Number is required"
    } else if (!phoneRegex.test(values.phone)) {
      error.phone = "Invalid Phone Number! Please try with country code"
    }
    if (!values.email) {
      error.email = "Email is required"
    } else if (!emailRegex.test(values.email)) {
      error.email = "Invalid email! Please try again"
    }
    if (!values.password) {
      error.password = "Password is required"
    } else if (values.password.length < 4) {
      error.password = "Password must be more than 4 characters"
    } else if (values.password.length > 10) {
      error.password = "Password cannot exceed more than 10 characters"
    }
    if (!values.confirmpwd) {
      error.confirmpwd = "Confirm Password is required"
    } else if (values.password != values.confirmpwd) {
      error.confirmpwd = "Passwords do not match. Try again"
    }
    return error
  }
  const signupHandler = async (e) => {
    e.preventDefault()
    const err = validateForm(user)
    setFormErrors(err)
    try {
      if (Object.keys(err).length < 1) {
        const res = await axios.post(`${apiUrl}/users/registerUser/`, user)
        if (res.data.success) {
          localStorage.setItem("user", JSON.stringify(res.data.user))
          navigate("/profile")
        }
      }
    } catch (err) {
      const res = err?.response?.data
      toast.error(res.message)
    }
  }

  return (
    <>
      <div className={registerstyle.register}>
        <form>
          <h1>Create your account</h1>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            onChange={changeHandler}
            value={user.name}
          />
          <p className={basestyle.error}>{formErrors.name}</p>
          <input
            type="text"
            name="phone"
            id="phone"
            placeholder="Phone Number"
            onChange={changeHandler}
            value={user.phone}
          />
          <p className={basestyle.error}>{formErrors.phone}</p>
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
          <input
            type="password"
            name="confirmpwd"
            id="confirmpwd"
            placeholder="Confirm Password"
            onChange={changeHandler}
            value={user.confirmpwd}
          />
          <p className={basestyle.error}>{formErrors.confirmpwd}</p>
          <button className={basestyle.button_common} onClick={signupHandler}>
            Register
          </button>
        </form>
        <NavLink to="/login">Already registered? Login</NavLink>
      </div>
    </>
  )
}
export default Signup
