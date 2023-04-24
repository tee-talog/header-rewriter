import React from "react"
import { HeaderRewriteOption } from "../types"
import clsx from "clsx"

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
    <table className={clsx("w-full", "my-2")}>
      <thead>
        <tr>
          <th className={clsx("text-xl", "font-normal", "text-left")}>name</th>
          <th className={clsx("text-xl", "font-normal", "text-left")}>
            pattern
          </th>
          <th className={clsx("text-xl", "font-normal", "text-left")}>type</th>
          <th className={clsx("text-xl", "font-normal", "text-left")}>key</th>
          <th className={clsx("text-xl", "font-normal", "text-left")}>value</th>
          <th className={clsx("text-xl", "font-normal", "text-left")}></th>
        </tr>
      </thead>
      <tbody>
        {options.map((option) => {
          const { operation, header, value } =
            option.rule.action.requestHeaders?.[0] ?? {}
          return (
            <tr key={option.id}>
              <td className={clsx("text-base")}>{option.name}</td>
              <td className={clsx("text-base")}>
                {option.rule.condition.regexFilter}
              </td>
              <td className={clsx("text-base", "text-center")}>
                <ListItem operation={operation} />
              </td>
              <td className={clsx("text-base")}>{header ?? ""}</td>
              <td className={clsx("text-base")}>{value && value}</td>
              <td className={clsx("text-base", "text-center")}>
                <button
                  type="button"
                  onClick={() => onRemove(option.id)}
                  className={clsx("border", "border-current")}
                >
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
