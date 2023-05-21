import clsx from "clsx"
import { ComponentProps, forwardRef } from "react"

const Input = forwardRef<HTMLInputElement, ComponentProps<"input">>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx(
          className,
          "px-2",
          "py-1",
          "border",
          "rounded",
          "border-gray-500",
          "focus:bg-gray-100",
          "text-base",
          "text-gray-900",
        )}
        {...props}
      />
    )
  },
)

export default Input
