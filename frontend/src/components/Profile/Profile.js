import React, { useState } from "react"
import basestyle from "../Base.module.css"
import profilestyle from "./Profile.module.css"
import GeneratePass from "../GeneratePass/GeneratePass"
import ViewPasses from "../ViewPasses/ViewPasses"

const Profile = () => {
  const [click1, setClick1] = useState(false)
  const [click2, setClick2] = useState(false)
  // if (click1 == true) {
  return (
    <div className={profilestyle.profile}>
      {click1 == false ? (
        <button className={profilestyle.button} onClick={() => setClick1(true)}>
          Generate Pass
        </button>
      ) : null}
      {click1 ? <GeneratePass /> : null}
      {click2 == false ? (
        <button className={profilestyle.button} onClick={() => setClick2(true)}>
          View Passes
        </button>
      ) : null}
      {click2 ? <ViewPasses /> : null}
    </div>
  )
  // } else if (click2 == true && click1==false) {
  // return <div></div>
  // }
}
export default Profile
