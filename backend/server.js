const path = require("path")
const express = require("express")
const morgan = require("morgan")
const dotenv = require("dotenv")
const cors = require("cors")
const colors = require("colors")
const { notFound, errorHandler } = require("./middleware/errorMiddleware.js")
const connectDB = require("./config/db.js")

const userRoutes = require("./routes/userRoutes.js")

dotenv.config()

connectDB()

const app = express()
app.use(cors())

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}

app.use(express.json())

app.use("/users", userRoutes)

if (process.env.NODE_ENV === "development") {
  app.get("/", (req, res) => {
    res.send("API is running...")
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
