import clsx from "clsx"
import { ComponentProps } from "react"

const OptionListItemColumn: React.FC<ComponentProps<"td">> = ({
  className,
  children,
  ...props
}) => {
  return (
    <td
      className={clsx(
        className,
        "py-2",
        "border-gray-500",
        "text-base",
        "text-gray-900",
      )}
      {...props}
    >
      {children}
    </td>
  )
}

export default OptionListItemColumn
