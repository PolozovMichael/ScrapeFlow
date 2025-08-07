'use client'

import { Button } from '@/components/ui/button'
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getSimpleBezierPath,
  useReactFlow,
} from '@xyflow/react'
import { X } from 'lucide-react'
import React from 'react'

export default function DeletableEdge(props: EdgeProps) {
  const [edgePath, labelX, labelY] = getSimpleBezierPath(props)

  const { setEdges } = useReactFlow()

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={props.markerEnd}
        style={props.style}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: 'all',
          }}
        >
          <Button
            onClick={() => {
              setEdges((edges) => edges.filter((edge) => edge.id !== props.id))
            }}
            variant={'outline'}
            size={'icon'}
            className="flex items-center justify-center h-5 w-5 border cursor-pointer rounded-full text-xs leading-none hover:shadow-lg"
          >
            <X className="stroke-red-600" />
          </Button>
        </div>
      </EdgeLabelRenderer>
    </>
  )
}
