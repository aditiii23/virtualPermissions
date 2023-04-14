import * as React from "react"
import verifyPassesStyle from "./VerifyPass.module.css"
import axios from "axios"
import { apiUrl } from "../../services/config"
import { Link, useNavigate } from "react-router-dom"


export default function Verify(item) {
const navigate = useNavigate()
  const startDate = item.start

  return (
    <div className={verifyPassesStyle.card}>
      <div>
        <p>Name: </p>
        <p> Email:</p>
        <p>Phone:</p>
        <p>Duration:</p>
        <p>Start Date:</p>
        <p>Start Time: </p>
      </div>
      <div className={verifyPassesStyle.item}>
        <p>{item.generateId} </p>
        <p> {item.name}</p>
        <p> {item.email}</p>
        <p>{item.phone}</p>
        <p>{item.duration}</p>
        <p>{startDate?.substring(0, 10)}</p>
        <p>{startDate?.substring(11, startDate.length - 8)}</p>
        <Link
          className={verifyPassesStyle.button_common}
          onClick={async () => {
          await axios.put(`${apiUrl}/passes/verifyPass/${item.generateId}`, {
              headers: {
                authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            navigate("/viewUnverifiedPass")
          }}
        >
          Verify Pass
        </Link>
      </div>
    </div>
  )
}
