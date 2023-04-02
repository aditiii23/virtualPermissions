const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://backend-9iiv.onrender.com"
    : "http://localhost:5000"

export { apiUrl }
