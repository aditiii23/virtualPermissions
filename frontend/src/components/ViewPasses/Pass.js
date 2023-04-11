import * as React from "react"
import viewPassesStyle from "./ViewPasses.module.css"

export default function Pass(item) {
  return (
      <div className={viewPassesStyle.card}>
        <p>{item.generateId} </p>
        <p> {item.name}</p>
        <p> {item.email}</p>
        <p>{item.phone}</p>
        <p>{item.duration}</p>
        <p>{item.start}</p>
      </div>
  )
}
