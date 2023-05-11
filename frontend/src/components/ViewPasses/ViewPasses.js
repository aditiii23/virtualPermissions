import React, { useState, useEffect } from "react"
import viewPassesStyle from "./ViewPasses.module.css"
import axios from "axios"
import Pass from "./Pass"
import { apiUrl } from "../../services/config"
import { toast } from "react-toastify"

const ViewPasses = (props) => {
  const [data, setData] = useState([])

  const fetchPasses = async () => {
    try {
      const res = await axios.get(`${apiUrl}/passes/viewPasses/`, {
        headers: { authorization: "Bearer " + localStorage.getItem("token") },
      })
      setData(res.data.passes)
    } catch (err) {
      toast.error(err?.response?.data?.message)
    }
  }

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
    if (props.verify == false) fetchPasses()
    else fetchUnverifiedPasses()
  }, [])

  return (
    <>
      <div className={viewPassesStyle.container}>
        {data?.map((item) => (
          <Pass
            item={item}
            key={item?.id}
            verify={props?.verify}
          />
        ))}
      </div>
    </>
  )
}
export default ViewPasses
