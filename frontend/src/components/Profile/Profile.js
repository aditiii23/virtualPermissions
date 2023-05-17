import React from "react"
import profilestyle from "./Profile.module.css"
import { useNavigate } from "react-router-dom"

const Profile = () => {
  const navigate = useNavigate()
  return (
    <div className={profilestyle.profile}>
        <button
          className={profilestyle.button}
          onClick={() => {
            navigate("/generatePass")
          }}
        >
          Generate Pass
        </button>
        <button
          className={profilestyle.button}
          onClick={() => {
            navigate("/viewPasses")
          }}
        >
          View Passes
        </button>
        <button
          className={profilestyle.button}
          onClick={() => {
            navigate("/verifyPass")
          }}
        >
        Verify Pass
        </button>
    </div>
  )
}
export default Profile
