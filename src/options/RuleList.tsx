import React from "react"
import { HeaderRewriteOption } from "../types"

const OptionList: React.FC<{
  options: HeaderRewriteOption[]
  onRemove: (id: number) => void
}> = ({ options, onRemove }) => {
  const ListItem: React.FC<{
    operation: chrome.declarativeNetRequest.HeaderOperation | undefined
  }> = ({ operation }) => (
    <li>
      {operation === chrome.declarativeNetRequest.HeaderOperation.SET
        ? "set"
        : "remove"}
    </li>
  )

  return (
    <table>
      <tbody>
        {options.map((option) => (
          <tr key={option.id}>
            <td>option name: {option.name}</td>
            <td>regexp: {option.rule.condition.regexFilter}</td>
            <td>
              <ul>
                <ListItem
                  operation={option.rule.action.requestHeaders?.[0].operation}
                />
              </ul>
            </td>
            <td>
              <button type="button" onClick={() => onRemove(option.id)}>
                remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default OptionList
