const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://backend-dun-nine.vercel.app"
    : "http://localhost:5000"

export { apiUrl }
