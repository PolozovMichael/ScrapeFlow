import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import Editor from '../../_components/Editor'

async function WorkflowEditorPage({
  params,
}: {
  params: { workflowId: string }
}) {
  const { workflowId } = params
  const { userId } = await auth()

  if (!userId) return <div>Unauthenticated</div>

  const workflow = await prisma.workflows.findUnique({
    where: {
      id: workflowId,
      userId,
    },
  })

  if (!workflow) return <div>Workflow not found</div>

  return <Editor workflow={workflow} />
}

export default WorkflowEditorPage
