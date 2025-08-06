'use client'

import { LucideIcon } from 'lucide-react'
import React from 'react'
import { DialogHeader } from './ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import { cn } from '@/lib/utils'
import { Separator } from '@radix-ui/react-separator'

type Props = {
  title?: string
  subTitle?: string
  icon?: LucideIcon
  iconClassName?: string
  titleClassName?: string
  subTitleClassName?: string
}

function CustomDialogHeader({
  title,
  subTitle,
  icon: Icon,
  iconClassName,
  titleClassName,
  subTitleClassName,
}: Props) {
  return (
    <DialogHeader className="py-6">
      <DialogTitle asChild>
        <div className="flex flex-col items-center gap-2 mb-2">
          {Icon && (
            <Icon size={30} className={cn('stroke-primary', iconClassName)} />
          )}
          {title && (
            <p className={cn('text-xl text-primary', titleClassName)}>
              {title}
            </p>
          )}
          {subTitle && (
            <p
              className={cn('text-sm text-muted-foreground', subTitleClassName)}
            >
              {subTitle}
            </p>
          )}
          <Separator />
        </div>
      </DialogTitle>
    </DialogHeader>
  )
}

export default CustomDialogHeader
