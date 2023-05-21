import clsx from "clsx"
import { ComponentProps } from "react"

const Input: React.FC<ComponentProps<"input">> = ({ className, ...props }) => {
  return (
    <input
      className={clsx(
        className,
        "px-2",
        "py-1",
        "border",
        "rounded",
        "border-gray-500",
        "focus:bg-gray-100",
        "min-w-[5rem]",
        "text-base",
        "text-gray-900",
      )}
      {...props}
    />
  )
}

export default Input
