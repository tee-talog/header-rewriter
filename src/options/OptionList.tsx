import React, { ComponentProps } from "react"
import { HeaderRewriteOption } from "../types"
import clsx from "clsx"
import OptionListItem from "./OptionListItem"

const OptionList: React.FC<{
  options: HeaderRewriteOption[]
  onRemove: (id: number) => void
}> = ({ options, onRemove }) => {
  const TableHeaderColumn: React.FC<ComponentProps<"th">> = ({ children }) => {
    return (
      <th className={clsx("py-2", "text-xl", "font-normal", "text-left")}>
        {children}
      </th>
    )
  }

  return (
    <table className={clsx("w-full", "my-2")}>
      <thead>
        <tr className={clsx("border-b", "border-gray-500")}>
          <TableHeaderColumn>name</TableHeaderColumn>
          <TableHeaderColumn>pattern</TableHeaderColumn>
          <TableHeaderColumn>type</TableHeaderColumn>
          <TableHeaderColumn>key</TableHeaderColumn>
          <TableHeaderColumn>value</TableHeaderColumn>
          <TableHeaderColumn></TableHeaderColumn>
        </tr>
      </thead>
      <tbody>
        {options.map((option) => {
          const { operation, header, value } =
            option.rule.action.requestHeaders?.[0] ?? {}
          const operationStr =
            operation === chrome.declarativeNetRequest.HeaderOperation.SET
              ? "set"
              : "remove"

          return (
            <OptionListItem
              id={option.id}
              name={option.name}
              regexFilter={option.rule.condition.regexFilter}
              operation={operationStr}
              header={header ?? ""}
              value={value}
              onRemove={onRemove}
            />
          )
        })}
      </tbody>
    </table>
  )
}

export default OptionList
