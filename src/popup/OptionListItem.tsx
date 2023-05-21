import clsx from "clsx"
import Input from "../components/Input"

const OptionListItem: React.FC<{
  id: number
  name: string
  regexFilter?: string
  operation: "set" | "remove"
  enabled: boolean
  onChange: (id: number, enable: boolean) => void
}> = ({ id, name, regexFilter, operation, enabled, onChange }) => {
  return (
    <tr className={clsx("border-b", "leading-8")}>
      <td className={clsx("text-base")}>{name}</td>
      <td className={clsx("text-base")}>{regexFilter}</td>
      <td className={clsx("text-base", "text-center")}>{operation}</td>
      <td
        className={clsx("text-base", "text-center", "flex", "justify-center")}
      >
        <label className={clsx("p-2")}>
          <Input
            type="checkbox"
            checked={enabled}
            onChange={() => onChange(id, !enabled)}
          />
        </label>
      </td>
    </tr>
  )
}

export default OptionListItem
