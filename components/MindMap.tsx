'use client'

import { useEffect } from 'react'
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow'
import 'reactflow/dist/style.css'

interface MindMapProps {
  data: any
}

const MindMap = ({ data }: MindMapProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])

  useEffect(() => {
    if (!data) return

    // Process the mindmap data to create nodes and edges
    const processedData = processData(data)
    setNodes(processedData.nodes)
    setEdges(processedData.edges)
  }, [data])

  // Process the mindmap data from the API into ReactFlow format
  const processData = (data: any) => {
    const nodes: Node[] = []
    const edges: Edge[] = []
    
    // Create root node
    nodes.push({
      id: 'root',
      data: { label: data.topic || 'Root' },
      position: { x: 0, y: 0 },
      style: {
        background: '#4F46E5',
        color: 'white',
        border: '1px solid #4F46E5',
        borderRadius: '8px',
        padding: '10px',
        width: 180,
      },
    })

    // Process children recursively
    if (data.children) {
      processChildren(data.children, 'root', nodes, edges, 1, 0)
    }

    return { nodes, edges }
  }

  // Recursively process child nodes
  const processChildren = (
    children: any[],
    parentId: string,
    nodes: Node[],
    edges: Edge[],
    level: number,
    startAngle: number
  ) => {
    const radius = level * 200
    const angleStep = (Math.PI * 2) / children.length
    
    children.forEach((child, index) => {
      const angle = startAngle + index * angleStep
      const x = Math.cos(angle) * radius
      const y = Math.sin(angle) * radius
      
      const nodeId = `${parentId}-${index}`
      
      // Add node
      nodes.push({
        id: nodeId,
        data: { label: child.name || child.topic || `Node ${nodeId}` },
        position: { x, y },
        style: {
          background: level === 1 ? '#10B981' : '#F9FAFB',
          color: level === 1 ? 'white' : '#111827',
          border: '1px solid #E5E7EB',
          borderRadius: '8px',
          padding: '10px',
          width: 150,
        },
      })
      
      // Add edge
      edges.push({
        id: `e-${parentId}-${nodeId}`,
        source: parentId,
        target: nodeId,
        style: { stroke: '#CBD5E1' },
      })
      
      // Process next level children
      if (child.children && child.children.length > 0) {
        processChildren(
          child.children,
          nodeId,
          nodes,
          edges,
          level + 1,
          angle - angleStep / 2
        )
      }
    })
  }

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
      attributionPosition="bottom-right"
    >
      <Controls />
      <Background color="#f8fafc" gap={16} />
    </ReactFlow>
  )
}

export default MindMap