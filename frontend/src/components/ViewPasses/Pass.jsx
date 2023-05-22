import React from "react"
import viewPassesStyle from "./ViewPasses.module.css"
import axios from "axios"
import { apiUrl } from "../../services/config"
import { Link, useNavigate } from "react-router-dom"

export default function Pass({ item, verify }) {
  const navigate = useNavigate()
  const startDate = item.start
  const verifyPass = async () => {
    await axios.put(
      `${apiUrl}/passes/verifyPass/${item._id}`,
      {},
      {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
    navigate("/")
  }

  return (
    <div className={viewPassesStyle.card}>
      <div>
        <p>Name: </p>
        <p>Email:</p>
        <p>Phone:</p>
        <p>Duration:</p>
        <p>Start Date:</p>
        <p>Start Time: </p>
        <p>OTP: </p>
      </div>
      <div className={viewPassesStyle.item}>
        <p>{item.generateId}</p>
        <p>{item.name}</p>
        <p>{item.email}</p>
        <p>{item.phone}</p>
        <p>{item.duration}</p>
        <p>{startDate?.substring(0, 10)}</p>
        <p>{startDate?.substring(11, startDate.length - 8)}</p>
        <p>{item.OTP}</p>
        {verify == true ? (
          <Link className={viewPassesStyle.button_common} onClick={verifyPass}>
            Verify Pass
          </Link>
        ) : null}
      </div>
    </div>
  )
}
