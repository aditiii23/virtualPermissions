// import React, { useState, useEffect } from "react"
// import verifyPassesStyle from "./VerifyPass.module.css"
// import VerifyPass from "./VerifyPass"
// import axios from "axios"
// import { apiUrl } from "../../services/config"
// import { toast } from "react-toastify"

// const ViewUnverifiedPass = () => {
//   const [data, setData] = useState([])

//   const fetchUnverifiedPasses = async () => {
//     try {
//       const res = await axios.get(`${apiUrl}/passes/viewUnverifiedPass`, {
//         headers: { authorization: "Bearer " + localStorage.getItem("token") },
//       })
//       setData(res.data.viewUnverified)
//     } catch (err) {
//       toast.error(err?.response?.data?.message)
//     }
//   }

//   useEffect(() => {
//     fetchUnverifiedPasses()
//   }, [])

//   return (
//     <>
//       <div className={verifyPassesStyle.container}>
//         {data?.map((item) => (
//           <VerifyPass
//             key={item?.id}
//             generateId={item?.generateId}
//             name={item?.name}
//             email={item?.email}
//             phone={item?.phone}
//             duration={item?.duration}
//             start={item?.start}
//           />
//         ))}
//       </div>
//     </>
//   )
// }
// export default ViewUnverifiedPass

import React, { useState, useEffect } from "react"
import verifyPassesStyle from "./VerifyPass.module.css"
import axios from "axios"
import Verify from "./VerifyPass"
import { apiUrl } from "../../services/config"
import { toast } from "react-toastify"

const ViewUnverifiedPass = () => {
  const [data, setData] = useState([])

  const fetchUnverifiedPasses = async () => {
    try {
      const res = await axios.get(`${apiUrl}/passes/viewUnverifiedPass`, {
        headers: { authorization: "Bearer " + localStorage.getItem("token") },
      })
      setData(res.data.viewUnverified)
    } catch (err) {
      toast.error(err?.response?.data?.message)
    }
  }

  useEffect(() => {
    fetchUnverifiedPasses()
  }, [])

  return (
    <>
      <div className={verifyPassesStyle.container}>
        {data?.map((item) => (
          <Verify
            key={item?.id}
            generateId={item?.generateId}
            name={item?.name}
            email={item?.email}
            phone={item?.phone}
            duration={item?.duration}
            start={item?.start}
          />
        ))}
      </div>
    </>
  )
}
export default ViewUnverifiedPass
