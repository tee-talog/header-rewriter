import React from "react"

// TODO 仮
export type HeaderSetOption = {
  type: "set"
  name: string
  regexFilter: string
  keyValue: {
    header: string
    value: string
  }[]
}

export type HeaderRemoveOption = {
  type: "remove"
  name: string
  regexFilter: string
  headers: string[]
}

type HeaderRewriteOption = HeaderSetOption | HeaderRemoveOption

const RuleList: React.FC<{ rules: HeaderRewriteOption[] }> = ({ rules }) => {
  const ListItemSet: React.FC<{ rule: HeaderSetOption }> = ({ rule }) => (
    <>
      {rule.keyValue.map(({ header, value }) => (
        <li key={header}>
          set: {header}: {value}
        </li>
      ))}
    </>
  )

  const ListItemRemove: React.FC<{ rule: HeaderRemoveOption }> = ({ rule }) => (
    <>
      {rule.headers.map((header) => (
        <li key={header}>remove: {header}</li>
      ))}
    </>
  )

  return (
    <table>
      <tbody>
        {rules.map((rule) => (
          <tr key={rule.regexFilter}>
            <td>rule name: {rule.name}</td>
            <td>regexp: {rule.regexFilter}</td>
            <td>
              <ul>
                {rule.type === "set" && <ListItemSet rule={rule} />}
                {rule.type === "remove" && <ListItemRemove rule={rule} />}
              </ul>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default RuleList
