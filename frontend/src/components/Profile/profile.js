const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"))

  return (
    <div>
      <h2 style={{ color: "black" }}>Hi {user.name} !!</h2>
    </div>
  )
}
export default Profile
