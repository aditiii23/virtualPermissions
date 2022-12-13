const mongoose = require("mongoose")
mongoose.Promise = global.Promise
var databaseConnection

const connectDB = async () => {
  try {
    databaseConnection = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    console.log(
      `Database connected ::: ${databaseConnection.connection.host}`.blue
        .underline
    )
  } catch (error) {
    console.error(`Error ::: ${error.message}`)
    process.exit(1)
  }
}

const disconnectDB = async () => {
  try {
    await databaseConnection.disconnect()
    console.log("Database disconnected")
  } catch (error) {
    console.error(`Error ::: ${error.message}`.red.bold)
    process.exit(1)
  }
}

module.exports = { connectDB, disconnectDB }
