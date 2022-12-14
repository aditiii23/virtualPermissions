import React, { useEffect, useState } from "react"
import basestyle from "../base.module.css"
import GeneratePass from "../GeneratePass/generatePass"
import ViewPasses from "../ViewPasses/viewPasses"

const Profile = () => {
  const [click, setClick] = useState(false)
  return (
    <div>
      {click == false ? (
        <button
          className={basestyle.button_common}
          onClick={() => setClick(true)}
        >
          Generate Pass
        </button>
      ) : null}
      {click ? <GeneratePass /> : null}

      {click == false ? (
        <button
          className={basestyle.button_common}
          onClick={() => setClick(true)}
        >
          View Passes
        </button>
      ) : null}
      {click ? <ViewPasses /> : null}
    </div>
  )
}
export default Profile
