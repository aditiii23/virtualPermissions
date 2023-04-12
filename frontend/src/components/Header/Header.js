import React, { useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import headerstyle from "./Header.module.css"
import { UserContext } from "../../App"

const Header = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useContext(UserContext)

  useEffect(() => {
    renderList()
  }, [state])

  const logoutHandler = () => {
    return [
      <li>
        <Link
          to="/login"
          className={headerstyle.button_common}
          onClick={() => {
            navigate("/login")
            localStorage.clear()
            dispatch({ type: "CLEAR" })
          }}
        >
          Logout
        </Link>
      </li>,
    ]
  }

  const renderList = () => {
    if (state) {
      return logoutHandler()
    } else {
      return [
        <li>
          <Link to="/login" className={headerstyle.button_common}>
            Login
          </Link>
        </li>,
        <li>
          <Link to="/register" className={headerstyle.button_common}>
            Register
          </Link>
        </li>,
      ]
    }
  }

  return (
    <nav className={headerstyle.nav}>
      <div className={headerstyle.header}>
        <div className={headerstyle.container}>
          <Link to={state ? "/" : "/login"}>Virtual Permissions</Link>
          <ul>{renderList()}</ul>
        </div>
      </div>
    </nav>
  )
}

export default Header
