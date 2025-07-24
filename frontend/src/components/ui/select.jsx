import * as React from "react"

export const Select = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <select
      ref={ref}
      className={`block w-full px-3 py-2 text-sm border rounded-md shadow-sm outline-none dark:bg-gray-800 dark:text-white dark:border-gray-600 ${className}`}
      {...props}
    />
  )
})

Select.displayName = "Select"
