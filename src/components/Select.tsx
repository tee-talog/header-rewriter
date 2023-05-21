import clsx from "clsx"
import { ComponentProps, forwardRef } from "react"

const Select = forwardRef<HTMLSelectElement, ComponentProps<"select">>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
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
      >
        {children}
      </select>
    )
  },
)

export default Select
