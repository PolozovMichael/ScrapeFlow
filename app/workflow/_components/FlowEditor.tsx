// src/components/FlowEditor.tsx
'use client'

import { Workflows } from '@prisma/client'
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from '@xyflow/react'
import React, { useCallback, useEffect } from 'react'
import '@xyflow/react/dist/style.css'
import NodeComponent from './nodes/NodeComponent'
import { CreateFlowNode } from '@/lib/workflow/createFlowNode'
import { TaskType } from '@/types/task'
import { AppNode } from '@/types/appNode'

const nodeTypes = {
  Node: NodeComponent,
}

const snapGrid: [number, number] = [50, 50]
const fitViewOptions = { padding: 1 }

export default function FlowEditor({ workflow }: { workflow: Workflows }) {
  const [nodes, setNodes, onNodesChanges] = useNodesState<AppNode>([])
  const [edges, setEdges, onEdgesChanges] = useEdgesState([])
  const { setViewport, screenToFlowPosition } = useReactFlow()

  useEffect(() => {
    try {
      const flow = JSON.parse(workflow.definition)
      if (!flow) return
      setNodes(flow.nodes || [])
      setEdges(flow.edges || [])
      if (!flow.viewport) return
      const { x = 0, y = 0, zoom = 1 } = flow.viewport
      setViewport({ x, y, zoom })
    } catch {
      // invalid or missing definition
    }
  }, [workflow.definition, setNodes, setEdges, setViewport])

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()
      const taskType = event.dataTransfer.getData('application/reactflow')
      if (!taskType) return

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      })

      const newNode = CreateFlowNode(taskType as TaskType, position)
      setNodes((nds) => nds.concat(newNode))
    },
    [screenToFlowPosition, setNodes]
  )

  return (
    <main className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChanges}
        onNodesChange={onNodesChanges}
        nodeTypes={nodeTypes}
        snapToGrid
        snapGrid={snapGrid}
        fitViewOptions={fitViewOptions}
        onDragOver={onDragOver}
        onDrop={onDrop}
        fitView
      >
        <Controls position="top-left" fitViewOptions={fitViewOptions} />
        <Background variant={BackgroundVariant.Lines} gap={12} size={1} />
      </ReactFlow>
    </main>
  )
}
