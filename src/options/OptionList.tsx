import React from "react"
import {
  HeaderRewriteOption,
  HeaderSetOption,
  HeaderRemoveOption,
} from "../types"

const OptionList: React.FC<{ options: HeaderRewriteOption[] }> = ({
  options,
}) => {
  const ListItemSet: React.FC<{ option: HeaderSetOption }> = ({ option }) => (
    <>
      {option.keyValue.map(({ header, value }) => (
        <li key={header}>
          set: {header}: {value}
        </li>
      ))}
    </>
  )

  const ListItemRemove: React.FC<{ option: HeaderRemoveOption }> = ({
    option,
  }) => (
    <>
      {option.headers.map((header) => (
        <li key={header}>remove: {header}</li>
      ))}
    </>
  )

  return (
    <table>
      <tbody>
        {options.map((option, i) => (
          <tr key={option.id}>
            <td>option name: {option.name}</td>
            <td>regexp: {option.regexFilter}</td>
            <td>
              <ul>
                {option.type === "set" && <ListItemSet option={option} />}
                {option.type === "remove" && <ListItemRemove option={option} />}
              </ul>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default OptionList
