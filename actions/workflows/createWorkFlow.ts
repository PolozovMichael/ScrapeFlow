'use server'

import { prisma } from '@/lib/prisma'
import { CreateFlowNode } from '@/lib/workflow/createFlowNode'
import { createWorkflowSchema } from '@/schema/workflows'
import { AppNode } from '@/types/appNode'
import { TaskType } from '@/types/task'
import { WorkflowStatus } from '@/types/types'
import { auth } from '@clerk/nextjs/server'
import { Edge } from '@xyflow/react'
import z from 'zod'

export async function CreateWorkflow(
  form: z.infer<typeof createWorkflowSchema>,
) {
  const { userId } = await auth()
  const { success, data } = createWorkflowSchema.safeParse(form)
  if (!userId) {
    throw new Error('not authenticated')
  }
  if (!success) {
    throw new Error('invalid form data')
  }

  const initialFlow: { nodes: AppNode[]; edges: Edge[] } = {
    nodes: [],
    edges: [],
  }

  initialFlow.nodes.push(CreateFlowNode(TaskType.LAUNCH_BROWSER))

  const result = await prisma.workflows.create({
    data: {
      userId,
      status: WorkflowStatus.DRAFT,
      definition: JSON.stringify(initialFlow),
      ...data,
    },
  })

  if (!result) {
    throw new Error('failed to create workflow')
  }

  return result?.id
}
