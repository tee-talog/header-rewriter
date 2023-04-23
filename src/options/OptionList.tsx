import React from "react"
import { HeaderRewriteOption } from "../types"

const OptionList: React.FC<{
  options: HeaderRewriteOption[]
  onRemove: (id: number) => void
}> = ({ options, onRemove }) => {
  const ListItem: React.FC<{
    operation: chrome.declarativeNetRequest.HeaderOperation | undefined
  }> = ({ operation }) => (
    <>
      {operation === chrome.declarativeNetRequest.HeaderOperation.SET
        ? "set"
        : "remove"}
    </>
  )

  return (
    <table>
      <tbody>
        {options.map((option) => {
          const { operation, header, value } =
            option.rule.action.requestHeaders?.[0] ?? {}
          return (
            <tr key={option.id}>
              <td>option name: {option.name}</td>
              <td>regexp: {option.rule.condition.regexFilter}</td>
              <td>
                <ListItem operation={operation} />
              </td>
              <td>{header ?? ""}</td>
              <td>{value && value}</td>
              <td>
                <button type="button" onClick={() => onRemove(option.id)}>
                  remove
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default OptionList
