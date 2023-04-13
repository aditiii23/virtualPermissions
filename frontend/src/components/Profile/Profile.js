import React, { useState } from "react"
import profilestyle from "./Profile.module.css"
import GeneratePass from "../GeneratePass/GeneratePass"
import ViewPasses from "../ViewPasses/ViewPasses"
import { useNavigate } from "react-router-dom"

const Profile = () => {
  const navigate = useNavigate()
  const [generate, setgenerate] = useState(false)
  const [view, setView] = useState(false)
  return (
    <div className={profilestyle.profile}>
      {generate == false ? (
        <button
          className={profilestyle.button}
          onClick={() => {
            setgenerate(true)
            navigate("/generatePass")
          }}
        >
          Generate Pass
        </button>
      ) : null}
      {generate ? <GeneratePass /> : null}
      {view == false ? (
        <button
          className={profilestyle.button}
          onClick={() => {
            setView(true)
            navigate("/viewPasses")
          }}
        >
          View Passes
        </button>
      ) : null}
      {view ? <ViewPasses /> : null}
    </div>
  )
}
export default Profile
