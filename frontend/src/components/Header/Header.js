import React, { useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import headerstyle from "./Header.module.css"
import "bootstrap/dist/css/bootstrap.css"
import { UserContext } from "../../App"
import { Container } from "react-bootstrap"

const Header = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useContext(UserContext)

  useEffect(() => {
    renderList()
  }, [state])
  const renderList = () => {
    if (state) {
      return [
        <li className="ulStyling">
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
    } else {
      return [
        <li className="ulStyling">
          <Link to="/login" className={headerstyle.button_common}>
            Login
          </Link>
        </li>,
        <li className="ulStyling">
          <Link to="/register" className={headerstyle.button_common}>
            Register
          </Link>
        </li>,
      ]
    }
  }

  return (
    <nav>
      <div className={headerstyle.header}>
        <Container>
          <Link to={state ? "/" : "/login"} className="logoStyle left">
            Virtual Permissions
          </Link>
          <ul className="ulStyling">
            {renderList()}
          </ul>
        </Container>
      </div>
    </nav>
  )
}

export default Header
