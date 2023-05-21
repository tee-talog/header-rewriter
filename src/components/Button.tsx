import clsx from "clsx"
import { ComponentProps } from "react"

const Button: React.FC<ComponentProps<"button">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        className,
        "px-3",
        "py-1",
        "border",
        "rounded",
        "border-gray-500",
        "bg-gray-100",
        "focus:bg-gray-200",
        "min-w-[2rem]",
        "text-base",
        "text-gray-900",
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
