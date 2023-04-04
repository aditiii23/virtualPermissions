import React, { useState, useEffect } from "react"
import viewPassesStyle from "./ViewPasses.module.css"
import axios from "axios"
import Pass from "./Pass"
import { apiUrl } from "../../services/config"
import { toast } from "react-toastify"

const ViewPasses = () => {
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

  useEffect(() => {
    fetchPasses()
  }, [])

  return (
    <>
      <div className={viewPassesStyle.container}>
        {data?.map((item) => (
          <div className={viewPassesStyle.card}>
            <Pass
              key={item?.id}
              generateId={item?.generateId}
              name={item?.name}
              email={item?.email}
              phone={item?.phone}
              duration={item?.duration}
              start={item?.start}
            />
          </div>
        ))}
      </div>
    </>
  )
}
export default ViewPasses
