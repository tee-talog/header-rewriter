import React, { ComponentProps } from "react"
import { HeaderRewriteOption } from "../types"
import clsx from "clsx"
import OptionListItem from "./OptionListItem"

const OptionList: React.FC<{
  options: HeaderRewriteOption[]
  className: string
  onRemove: (id: number) => void
}> = ({ options, className, onRemove }) => {
  const TableHeaderColumn: React.FC<ComponentProps<"th">> = ({
    className,
    children,
  }) => {
    return (
      <th
        className={clsx(
          className,
          "py-2",
          "text-xl",
          "font-normal",
          "text-left",
        )}
      >
        {children}
      </th>
    )
  }

  return (
    <table className={clsx(className)}>
      <thead>
        <tr className={clsx("border-b", "border-gray-500")}>
          <TableHeaderColumn className={clsx("w-40")}>名前</TableHeaderColumn>
          <TableHeaderColumn>パターン</TableHeaderColumn>
          <TableHeaderColumn className={clsx("w-16")}>タイプ</TableHeaderColumn>
          <TableHeaderColumn className={clsx("w-40")}>キー</TableHeaderColumn>
          <TableHeaderColumn className={clsx("w-40")}>値</TableHeaderColumn>
          <TableHeaderColumn className={clsx("w-24")}></TableHeaderColumn>
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
              key={option.id}
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
