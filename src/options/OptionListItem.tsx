import clsx from "clsx"
import OptionListItemColumn from "./OptionListItemColumn"
import Button from "../components/Button"

const OptionListItem: React.FC<{
  id: number
  name: string
  regexFilter?: string
  operation: "set" | "remove"
  header: string
  value?: string
  onRemove: (id: number) => void
}> = ({ id, name, regexFilter, operation, header, value, onRemove }) => {
  return (
    <tr className={clsx("border-b", "border-gray-300")}>
      <OptionListItemColumn>{name}</OptionListItemColumn>
      <OptionListItemColumn>{regexFilter}</OptionListItemColumn>
      <OptionListItemColumn>{operation}</OptionListItemColumn>
      <OptionListItemColumn>{header}</OptionListItemColumn>
      <OptionListItemColumn>{value && value}</OptionListItemColumn>
      <OptionListItemColumn>
        <Button type="button" onClick={() => onRemove(id)}>
          remove
        </Button>
      </OptionListItemColumn>
    </tr>
  )
}

export default OptionListItem
