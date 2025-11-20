"use client"

import React from "react"
import { Button as MedusaButton } from "@medusajs/ui"
import clsx from "clsx"

interface CustomButtonProps extends React.ComponentPropsWithoutRef<typeof MedusaButton> {}

export const CustomButton: React.FC<CustomButtonProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <MedusaButton
      {...props}
      className={clsx(
        "bg-primary text-surface border-border hover:bg-secondary px-4 py-2 rounded",
        className
      )}
    >
      {children}
    </MedusaButton>
  )
}
