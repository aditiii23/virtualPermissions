import React, { useState, useEffect } from "react"
import Grid from "@mui/material/Grid"
import axios from "axios"
import Pass from "./pass"

const ViewPasses = () => {
  const [data, setData] = useState([])
  const fetchPasses = async () => {
    const res = await axios.get("http://localhost:7000/passes/viewPasses/", {
      headers: { authorization: "Bearer " + localStorage.getItem("token") },
    })
    setData(res.data.passes)
  }

  useEffect(() => {
    fetchPasses()
  }, [])

  return (
    <>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item xs={4}>
            <Pass
              key={item?.id}
              generateId={item?.generateId}
              name={item?.name}
              email={item?.email}
              phone={item?.phone}
              duration={item?.duration}
              start={item?.start}
            />
           </Grid>
        ))}
      </Grid>
    </>
  )
}
export default ViewPasses
