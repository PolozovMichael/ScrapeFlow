'use client'

import CustomDialogHeader from '@/components/CustomDialogHeader'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import {
  createWorkflowSchema,
  createWorkflowSchemaType,
} from '@/schema/workflows'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { Layers2Icon, Loader2 } from 'lucide-react'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useMutation } from '@tanstack/react-query'
import { CreateWorkflow } from '@/actions/workflows/createWorkFlow'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

function CreateworkflowDialog({ triggerText }: { triggerText?: string }) {
  const router = useRouter()

  const [open, setOpen] = React.useState<boolean>(false)

  const form = useForm<z.infer<typeof createWorkflowSchema>>({
    resolver: zodResolver(createWorkflowSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  })

  const { mutateAsync, isPending } = useMutation({
    mutationFn: CreateWorkflow,
    onSuccess: () => {
      toast.success('Workflow created', { id: 'create-workflow' })
    },
    onError: () => {
      toast.error('Failed to create workflow', { id: 'create-workflow' })
    },
  })

  const onSubmit = async (values: createWorkflowSchemaType) => {
    const id = await mutateAsync(values)
    router.push(`/workflow/editor/${id}`)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        form.reset()
        setOpen(open)
      }}
    >
      <DialogTrigger asChild>
        <Button>{triggerText ?? 'Create workflow'}</Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader
          icon={Layers2Icon}
          title="Create workflow"
          subTitle="Start building your workflow"
        />
        <div className="p-6">
          <FormProvider {...form}>
            <form
              className="space-y-8"
              action=""
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-col space-y-1 items-center">
                    <FormLabel className="text-xs text-primary">
                      Name
                      <p>(required)</p>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Choose a descriptive and unique name
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="flex-col space-y-1 items-center">
                    <FormLabel className="text-xs text-primary">
                      Description
                      <p>(optional)</p>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Write down the description
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {!isPending ? 'Proceed' : <Loader2 className="animate-spin" />}
              </Button>
            </form>
          </FormProvider>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CreateworkflowDialog
