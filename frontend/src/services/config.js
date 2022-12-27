const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://backend-aditiii23.vercel.app"
    : "http://localhost:5000"

export { apiUrl }
