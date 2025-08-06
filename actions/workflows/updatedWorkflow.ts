'use server'

import { prisma } from '@/lib/prisma'
import { WorkflowStatus } from '@/types/types'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

export async function UpdateWorkflow({
  id,
  definition,
}: {
  id: string
  definition: string
}) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('unathorized')
  }

  const workflow = await prisma.workflows.findUnique({
    where: {
      id,
      userId,
    },
  })

  if (!workflow) {
    throw new Error('workflow not found')
  }

  if (workflow.status !== WorkflowStatus.DRAFT) {
    throw new Error('workflow is already published')
  }

  await prisma.workflows.update({
    data: {
      definition,
    },
    where: {
      id,
      userId,
    },
  })

  revalidatePath('/workflows')
}
