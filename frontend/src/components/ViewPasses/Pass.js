import * as React from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import viewPassesStyle from "./ViewPasses.module.css"

export default function Pass(item) {
  return (
    <div className={viewPassesStyle.ViewPasses}>
      <Card sx={{ minWidth: 250 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {item.generateId}
          </Typography>
          <Typography variant="h5" component="div">
            {item.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {item.email}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {item.phone}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {item.duration}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {item.start}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}
