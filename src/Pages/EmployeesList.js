import React from "react";
import { actions } from "../store"
import { useSelector } from "react-redux";
import User from "../User";

const EmployeesList = () => {
  const tableData = useSelector(() => actions.get("tableData", {}))
  const {
    users = {},
    search = "",
    sort = { field: "", order: "" },
    checkedUsers = {}
  } = tableData
  const userList = Object.values(users)
  const headers = ["name", "username"]

  const filteredUsers = userList.filter(value => (
   value.name.toLowerCase().includes(search.toLowerCase()) ||
   value.username.toLowerCase().includes(search.toLowerCase())
 ))

  const fetchData = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users")
    const data = await response.json()
    const dataObject = data.reduce((acc, user) => {
      acc[user.id] = user
      return acc
    }, {})
    actions.set("tableData.users", dataObject)
}

  return (
    <div className="App">
      <div className="tables">
        <div className="table">
          <input
            className="search"
            type="search"
            placeholder="  Type here"
            onChange={event => actions.set("tableData.search", event.target.value)}
            value={search}
          />
          <table>
            <thead>
              <tr>
                <th> </th>
                <th>id</th>
                {headers.map((header) => (
                  <th key={header}>
                    <button
                      onClick={() => {
                    if (header !== sort.field) {
                      actions.set("tableData.sort", { field: header, order: "ASC" })
                    } else if (sort.order === "ASC") {
                      actions.set("tableData.sort", { field: header, order: "DSC" })
                    } else {
                      actions.set("tableData.sort", {})
                    }
                  }}
                    >
                      {header}
                    </button>
                    {header === sort.field &&
                      <span>
                        {sort.order === "DSC"
                        ? " 🔽"
                        : " 🔼"
                      }
                      </span>
                  }
                  </th>
            ))}
              </tr>
            </thead>
            <tbody>
              {filteredUsers
              .sort((a, b) => {
                const orderModifier = sort.order === "DSC"
                  ? -1
                  : 1
                if (sort.field) {
                  return a[sort.field].localeCompare(b[sort.field]) * orderModifier
                }
              })
              .map(user => (
                <User
                  key={user.id}
                  user={user}
                  checked={checkedUsers[user.id]}
                  onCheck={() => {
                    actions.update(`tableData.checkedUsers.${user.id}`,
                      (a) => !a
                    )
                  }}
                />
              ))
            }
            </tbody>
          </table>
          <button
            onClick={() =>
              actions.set("tableData.users",
              Object.values(users).filter((_user) => checkedUsers[_user.id] !== true))}
          >
            Delete
          </button>
          <button
            onClick={() => {
              actions.set("tableData.users",
              Object.values(users).filter((_user) => checkedUsers[_user.id] !== true))
              actions.set("promotedData.promotedUsers",
              Object.values(users).filter((_user) => checkedUsers[_user.id] === true))
            }}
          >
            Promote
          </button>
          <button
            onClick={fetchData}
          >
            Get employees
          </button>
        </div>
        {(filteredUsers.length === 0 && users.length !== 0) && <div> No users displayed. </div>}
      </div>
    </div>
  )
}

export default EmployeesList;