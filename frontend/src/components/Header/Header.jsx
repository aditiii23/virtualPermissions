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
      <>
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
      </>,
    ]
  }

  const renderList = () => {
    if (state) {
      return logoutHandler()
    } else {
      return [
        <>
          <Link to="/login" className={headerstyle.button_common}>
            Login
          </Link>
        </>,
        <>
          <Link to="/register" className={headerstyle.button_common}>
            Register
          </Link>
        </>,
      ]
    }
  }

  return (
    <div className={headerstyle.header}>
      <div className={headerstyle.container}>
        <div className={headerstyle.title}>
          <Link className={headerstyle.titletext} to={state ? "/" : "/login"}>Virtual Permissions</Link>
        </div>
        <div className={headerstyle.links}>{renderList()}</div>
      </div>
    </div>
  )
}

export default Header
