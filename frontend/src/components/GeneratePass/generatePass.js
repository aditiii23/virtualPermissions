import React, { useState } from "react"
import basestyle from "../base.module.css"
import generatePassStyle from "./generatePass.module.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const GeneratePass = () => {
  const navigate = useNavigate()
  const [formErrors, setFormErrors] = useState({})
  const [newPass, setPassDetails] = useState({
    name: "",
    phone: "",
    email: "",
    duration: "",
    start: "",
  })

  const changeHandler = (e) => {
    const { name, value } = e.target
    setPassDetails({
      ...newPass,
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
    if (!values.duration) {
      error.duration = "Duration is required"
    }
    if (!values.start) {
      error.start = "Start Date is required"
    }
    return error
  }
  const generatePassHandler = async (e) => {
    e.preventDefault()
    setFormErrors(validateForm(newPass))
    // console.log(localStorage.getItem("token"))
    const res = await axios.post(
      "https://virtual-permissions-backend.vercel.app/passes/generatePass/",
      newPass,
      {
        headers: { authorization: "Bearer " + localStorage.getItem("token") },
      }
    )
    if (res.data.success) {
      localStorage.setItem("newPass", JSON.stringify(res.data.newPass))
      navigate("/viewPasses")
    } else {
      alert("Something went wrong")
    }
  }

  return (
    <>
      <div className={generatePassStyle.generatePass}>
        <form>
          <h1>Create New Pass</h1>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            onChange={changeHandler}
            value={newPass.name}
          />
          <p className={basestyle.error}>{formErrors.name}</p>
          <input
            type="text"
            name="phone"
            id="phone"
            placeholder="Phone Number"
            onChange={changeHandler}
            value={newPass.phone}
          />
          <p className={basestyle.error}>{formErrors.phone}</p>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={changeHandler}
            value={newPass.email}
          />
          <p className={basestyle.error}>{formErrors.email}</p>
          <input
            type="duration"
            name="duration"
            id="duration"
            placeholder="Duration"
            onChange={changeHandler}
            value={newPass.duration}
          />
          <p className={basestyle.error}>{formErrors.duration}</p>
          <input
            type="start"
            name="start"
            id="start"
            placeholder="Start Date"
            onChange={changeHandler}
            value={newPass.start}
          />
          <p className={basestyle.error}>{formErrors.start}</p>
          <button
            className={basestyle.button_common}
            onClick={generatePassHandler}
          >
            Generate Pass
          </button>
        </form>
      </div>
    </>
  )
}
export default GeneratePass
