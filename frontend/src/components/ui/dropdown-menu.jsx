import * as React from "react"
import {
  DropdownMenu as DropdownPrimitive,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu"

export function DropdownMenu({ children }) {
  return <DropdownPrimitive>{children}</DropdownPrimitive>
}

DropdownMenu.Trigger = DropdownMenuTrigger
DropdownMenu.Content = ({ children, className, ...props }) => (
  <DropdownMenuContent
    className={`z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 text-gray-700 shadow-md dark:bg-gray-800 dark:text-gray-200 ${className}`}
    {...props}
  >
    {children}
  </DropdownMenuContent>
)
DropdownMenu.Item = ({ children, className, ...props }) => (
  <DropdownMenuItem
    className={`cursor-pointer select-none rounded-sm px-2 py-1.5 text-sm outline-none transition hover:bg-gray-100 dark:hover:bg-gray-700 ${className}`}
    {...props}
  >
    {children}
  </DropdownMenuItem>
)
DropdownMenu.Label = DropdownMenuLabel
DropdownMenu.Separator = DropdownMenuSeparator
