import React, { useEffect, useState } from "react"
import basestyle from "../base.module.css"
import registerstyle from "./signup.module.css"
import axios from "axios"

import { useNavigate, NavLink } from "react-router-dom"
const Signup = () => {
  const navigate = useNavigate()

  const [formErrors, setFormErrors] = useState({})
  const [isSubmit, setIsSubmit] = useState(false)
  const [user, setUserDetails] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmpwd: "",
  })

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
    if (!values.name) {
      error.name = "Name is required"
    }
    if (!values.phone) {
      error.phone = "Phone Number is required"
    }
    if (!values.email) {
      error.email = "Email is required"
    } else if (!regex.test(values.email)) {
      error.email = "This is not a valid email format!"
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
    }
    if (values.password != values.confirmpwd) {
      error.confirmpwd = "Passwords do not match. Try again"
    }
    return error
  }
  const signupHandler = async (e) => {
    e.preventDefault()
    setFormErrors(validateForm(user))
    const res = await axios.post(
      "http://localhost:5000/users/registerUser/",
      user
    )
    if(res.data.success) {
      localStorage.setItem("user", JSON.stringify(res.data.user))
      navigate("/profile")
    }
    else{
      alert("Something went wrong")
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
