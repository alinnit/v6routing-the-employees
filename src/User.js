import React from "react"


const User = ({ user, onCheck, checked }) => {
  const { id, name, username } = user

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          value={checked}
          onClick={() => onCheck(user)}
        />
      </td>
      <td>{id}</td>
      <td>{name}</td>
      <td>{username}</td>
    </tr>
  )
}


export default User