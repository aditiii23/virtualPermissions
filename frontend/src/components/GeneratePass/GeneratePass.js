import React, { useState } from "react"
import { toast } from "react-toastify"
import basestyle from "../Base.module.css"
import generatePassStyle from "./GeneratePass.module.css"
import { apiUrl } from "../../services/config"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const GeneratePass = () => {
  const navigate = useNavigate()
  const [formErrors, setFormErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
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
    const emailRegex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i
    if (!values.name) {
      error.name = "Name is required"
    }
    if (!values.phone) {
      error.phone = "Phone Number is required"
    }
    if (!values.email) {
      error.email = "Email is required"
    } else if (!emailRegex.test(values.email)) {
      error.email = "This is not a valid email format!"
    }
    if (!values.duration) {
      error.duration = "Duration is required"
    }
    if (!values.start) {
      error.start = "Start Date is required"
    }
    if (new Date(values.start).getTime()+60000 < new Date()) {
      error.start = "Start time and date to be greater than current"
    }
    return error
  }
  const generatePassHandler = async (e) => {
    e.preventDefault()
    const err = validateForm(newPass)
    setFormErrors(err)
    try {
      setIsLoading(true)
      if (Object.keys(err).length < 1) {
        let res = await axios.post(`${apiUrl}/passes/generatePass/`, newPass, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        navigate("/viewPasses")
      }
    } catch (err) {
      toast.error(err?.response?.data?.message)
    } finally {
      setIsLoading(false)
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
            disabled={isLoading}
          />
          <p className={basestyle.error}>{formErrors.name}</p>
          <input
            type="text"
            name="phone"
            id="phone"
            placeholder="Phone Number"
            onChange={changeHandler}
            value={newPass.phone}
            disabled={isLoading}
          />
          <p className={basestyle.error}>{formErrors.phone}</p>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={changeHandler}
            value={newPass.email}
            disabled={isLoading}
          />
          <p className={basestyle.error}>{formErrors.email}</p>
          <input
            type="number"
            name="duration"
            id="duration"
            min="1"
            max="24"
            placeholder="Duration"
            onChange={changeHandler}
            value={newPass.duration}
            disabled={isLoading}
          />
          <p className={basestyle.error}>{formErrors.duration}</p>
          <input
            type="datetime-local"
            name="start"
            id="start"
            min={new Date()}
            placeholder="Start Date"
            onChange={changeHandler}
            value={newPass.start}
            disabled={isLoading}
          />
          <p className={basestyle.error}>{formErrors.start}</p>
          <button
            className={generatePassStyle.button}
            onClick={generatePassHandler}
            disabled={isLoading}
          >
            Generate Pass
          </button>
        </form>
      </div>
    </>
  )
}
export default GeneratePass
