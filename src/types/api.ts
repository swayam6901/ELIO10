export type Level = 'l10' | 'l18' | 'lexpert' | 'all'
export interface MindmapNode { id: string; label: string }
export interface MindmapEdge { from: string; to: string; label?: string }
export interface MindmapData { nodes: MindmapNode[]; edges: MindmapEdge[] }
export interface ExplainResponse {
title: string
level: 'l10' | 'l18' | 'lexpert'
text: string
mindmap: MindmapData | null
source: 'ai_live' | string
}
export interface MultiLevelResponse {
l10?: ExplainResponse
l18?: ExplainResponse
lexpert?: ExplainResponse
}
