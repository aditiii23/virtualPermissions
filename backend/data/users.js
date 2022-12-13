import bcrypt from "bcryptjs"

const users = [
  {
    name: "First User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    phone: "1111111111",
  },
  {
    name: "Second User",
    email: "second@example.com",
    password: bcrypt.hashSync("123456", 10),
    phone: "2222222222",
  },
  {
    name: "Third User",
    email: "third@example.com",
    password: bcrypt.hashSync("1234", 10),
    phone: "3333333333",
  },
]

export default users
