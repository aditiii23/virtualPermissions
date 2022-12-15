import React, { useEffect, useState } from "react"
import basestyle from "../base.module.css"
import GeneratePass from "../GeneratePass/generatePass"
import ViewPasses from "../ViewPasses/viewPasses"

const Profile = () => {
  const [click1, setClick1] = useState(false)
  const [click2, setClick2] = useState(false)
  // if (click1 == true) {
  return (
    <div>
      {click1 == false ? (
        <button
          className={basestyle.button_common}
          onClick={() => setClick1(true)}
        >
          Generate Pass
        </button>
      ) : null}
      {click1 ? <GeneratePass /> : null}
      {click2 == false ? (
        <button
          className={basestyle.button_common}
          onClick={() => setClick2(true)}
        >
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
