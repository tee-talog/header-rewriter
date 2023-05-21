import clsx from "clsx"
import { HeaderRewriteOption } from "../types"
import OptionListItem from "./OptionListItem"

const convertToType = (
  type: chrome.declarativeNetRequest.HeaderOperation | undefined,
) =>
  type === chrome.declarativeNetRequest.HeaderOperation.SET ? "set" : "remove"

const OptionList: React.FC<{
  options: HeaderRewriteOption[]
  onChange: (id: number, enable: boolean) => void
}> = ({ options, onChange }) => {
  return (
    <table className={clsx("w-full")}>
      <thead className={clsx("my-2")}>
        <tr className={clsx("border-b", "leading-8")}>
          <th className={clsx("text-xl", "font-normal", "text-left")}>name</th>
          <th className={clsx("text-xl", "font-normal", "text-left")}>
            pattern
          </th>
          <th className={clsx("text-xl", "font-normal", "w-20")}>type</th>
          <th className={clsx("text-xl", "font-normal", "w-20")}>on/off</th>
        </tr>
      </thead>

      <tbody>
        {options.map((option) => (
          <OptionListItem
            id={option.id}
            name={option.name}
            regexFilter={option.rule.condition.regexFilter}
            operation={convertToType(
              option.rule.action.requestHeaders?.[0].operation,
            )}
            enabled={option.enabled}
            onChange={onChange}
          />
        ))}
      </tbody>
    </table>
  )
}

export default OptionList
