import React, { useState, useEffect } from "react"
import axios from "axios"
import { apiUrl } from "../../services/config"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import basestyle from "../../components/Base.module.css"
import verifystyle from "./VerifyPass.module.css"

const Verify = () => {
  const navigate = useNavigate()
  const [formErrors, setFormErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [verifyOTP, setVerifyOTP] = useState({
    OTP: "",
  })

  const changeHandler = (e) => {
    const { name, value } = e.target
    setVerifyOTP((prevState) => {
      return {
        ...prevState,
        [name]: value,
      }
    })
  }

  const validateForm = (values) => {
    const error = {}
    if (!values.OTP) {
      error.OTP = "OTP is required"
    } else if (values.OTP.length < 6 || values.OTP.length > 6) {
      error.OTP = "Please enter a valid OTP"
    }
    return error
  }

  const verifyHandler = async (e) => {
    e.preventDefault()
    const err = validateForm(verifyOTP)
    setFormErrors(err)
    try {
      setIsLoading(true)
      if (Object.keys(err).length < 1) {
        let res = await axios.patch(
          `${apiUrl}/passes/verifyPass`,
          { otp: verifyOTP["OTP"] },
          {
            headers: {
              authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        toast.success("Verified successfully!")
        navigate("/")
      }
    } catch (err) {
      toast.error(err?.response?.data?.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className={verifystyle.verify}>
        <div className={verifystyle.verifyform}>
          <h1>Verify Pass</h1>
          <input
            type="text"
            name="OTP"
            id="OTP"
            placeholder="OTP"
            onChange={changeHandler}
            value={verifyOTP.OTP}
            disabled={isLoading}
          />
          <p className={basestyle.error}>{formErrors.OTP}</p>
          <button
            className={verifystyle.button_common}
            onClick={verifyHandler}
            disabled={isLoading}
          >
            Verify Pass
          </button>
        </div>
      </div>
    </>
  )
}
export default Verify
