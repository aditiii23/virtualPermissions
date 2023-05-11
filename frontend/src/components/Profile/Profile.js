import React from "react"
import profilestyle from "./Profile.module.css"
import { useNavigate } from "react-router-dom"

//check for role for button display (array element) user, guard, admin
//onClick function upar likhna
//css ek class ki use krni hai
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
            navigate("/viewUnverifiedPass")
          }}
        >
        Verify Pass
        </button>
    </div>
  )
}
export default Profile
