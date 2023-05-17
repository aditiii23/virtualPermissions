import React from "react"
import profilestyle from "./Profile.module.css"
import { useNavigate } from "react-router-dom"

const Profile = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))
  const viewRole = user.role

  return (
    <div className={profilestyle.profile}>
      {viewRole === "admin" ? (
        <>
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
        </>
      ) : viewRole === "user" ? (
        <>
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
        </>
      ) : viewRole === "guard" ? (
        <>
          <button
            className={profilestyle.button}
            onClick={() => {
              navigate("/verifyPass")
            }}
          >
            Verify Pass
          </button>
        </>
      ) : null}
    </div>
  )
}

export default Profile
