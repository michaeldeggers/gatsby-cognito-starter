import React from "react"
import { Link } from "gatsby"
import { isLoggedIn } from "../utils/auth"
import SignOutButton from "./SignOutButton"

export default () => {
  const content = { message: "", login: true }
  if (isLoggedIn()) {
    content.message = `Hello, User`
  } else {
    content.message = "You are not logged in"
  }
  return (
    <div
      style={{
        display: "flex",
        flex: "1",
        justifyContent: "space-between",
        borderBottom: "1px solid #d1c1e0",
      }}
    >
      <span>{content.message}</span>

      <nav>
        <Link to="/">Home</Link>
        {` `}
        <Link to="/app/profile">Profile</Link>
        {` `}
        <Link to="/app/test">Test</Link>
        {` `}
        {isLoggedIn() ? (
          <SignOutButton/>
        ) : null}
      </nav>
    </div>
  )
}
