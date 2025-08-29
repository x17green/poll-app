'use client'

import * as React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { labelVariants } from '@/lib/theme'

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {
  required?: boolean
  optional?: boolean
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, variant, size, required, optional, children, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(labelVariants({ variant, size }), className)}
      {...props}
    >
      {children}
      {required && <span className="text-destructive ml-1">*</span>}
      {optional && <span className="text-muted-foreground ml-1 text-xs">(optional)</span>}
    </label>
  )
)

Label.displayName = 'Label'

export { Label, labelVariants }
