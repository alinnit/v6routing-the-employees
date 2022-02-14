import React from "react";
import { useSelector } from "react-redux";
import { actions } from "../store"
import User from "../User";

const PromotedPage = () => {
  const promoted = useSelector(() => actions.get("promotedData", {}))
  const {
    promotedUsers = {},
    promotedSearch = "",
    promotedSort = { field: "", order: "" },
    checkedPromotedUsers = {}
  } = promoted
  const headers = ["name", "username"]
  const filteredUsers = promotedUsers.filter(value => (
    value.name.toLowerCase().includes(promotedSearch.toLowerCase()) ||
    value.username.toLowerCase().includes(promotedSearch.toLowerCase())
  ))

  return (
    <div className="table">
      <input
        className="search"
        type="search"
        placeholder="  Type here"
        onChange={event => actions.set("promotedData.promotedSearch", event.target.value)}
        value={promotedSearch}
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
                    if (header !== promotedSort.field) {
                      actions.set("promotedData.promotedSort", { field: header, order: "ASC" })
                    } else if (promotedSort.order === "ASC") {
                      actions.set("promotedData.promotedSort", { field: header, order: "DSC" })
                    } else {
                      actions.set("promotedData.promotedSort", {})
                    }
                  }}
                >
                  {header}
                </button>
                {header === promotedSort.field &&
                  <span>
                    {promotedSort.order === "DSC"
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
                const orderModifier = promotedSort.order === "DSC"
                  ? -1
                  : 1
                if (promotedSort.field) {
                  return a[promotedSort.field].localeCompare(b[promotedSort.field]) * orderModifier
                }
              })
              .map(user => (
                <User
                  key={user.id}
                  user={user}
                  checked={checkedPromotedUsers[user.id]}
                  onCheck={() => {
                    actions.update(`promotedData.checkedPromotedUsers.${user.id}`,
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
          actions.set("promotedData.promotedUsers",
          Object.values(promotedUsers).filter((_user) => checkedPromotedUsers[_user.id] !== true))}
      >
        Delete
      </button>
      {(promotedUsers.length === 0) && <div> No one is promoted. Everyone get back to work! </div>}
      {(filteredUsers.length === 0 && promotedUsers.length !== 0) && <div> No users found matching your search </div>}
    </div>
  )
}

export default PromotedPage