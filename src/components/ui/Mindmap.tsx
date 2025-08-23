'use client'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import type { MindmapData } from '@/types/api'
const ForceGraph2D = dynamic(() => import('react-force-graph').then(m => m.ForceGraph2D), { ssr: false })
export default function Mindmap({ data }: { data: MindmapData }) {
const graphData = useMemo(() => ({
nodes: data.nodes.map(n => ({ id: n.id, name: n.label })),
links: data.edges.map(e => ({ source: e.from, target: e.to, label: e.label }))
}), [data])
return (
<div className="h-80 w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-white dark:bg-neutral-950">
<ForceGraph2D
graphData={graphData as any}
nodeLabel={(n: any) => n.name}
linkLabel={(l: any) => l.label}
nodeCanvasObjectMode={() => 'after'}
nodeCanvasObject={(node: any, ctx, globalScale) => {
const label = node.name
const fontSize = 12 / globalScale
ctx.font = `${fontSize}px Sans-Serif`
ctx.textAlign = 'center'
ctx.textBaseline = 'middle'
ctx.fillStyle = '#111827'
ctx.fillText(label, node.x, node.y)
}}
/>
</div>
)
}
