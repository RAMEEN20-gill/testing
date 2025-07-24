import * as React from "react"

export const Input = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-400 dark:focus:ring-blue-400 ${className}`}
      {...props}
    />
  )
})

Input.displayName = "Input"
