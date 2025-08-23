'use client'
import { useState } from 'react'
import Button from './ui/Button'
import { copyToClipboard, downloadJSON } from '@/lib/utils'
import type { ExplainResponse, MultiLevelResponse } from '@/types/api'
interface Props {
single?: ExplainResponse
multi?: MultiLevelResponse
}
const TabButton = ({ active, onClick, children }: any) => (
<button onClick={onClick} className={`px-3 py-1 rounded-full text-sm border ${active ? 'bg-brand text-white border-brand' : 'border-neutral-300 dark:border-neutral-700'}`}>{children}</button>
)
export default function ResultTabs({ single, multi }: Props) {
const [tab, setTab] = useState<'l10' | 'l18' | 'lexpert'>(single?.level || 'l10')
const view: Record<string, ExplainResponse | undefined> = multi || single ? {
l10: multi?.l10 || (single?.level === 'l10' ? single : undefined),
l18: multi?.l18 || (single?.level === 'l18' ? single : undefined),
lexpert: multi?.lexpert || (single?.level === 'lexpert' ? single : undefined)
} : {}
const current = view[tab]
if (!current) return null
return (
<div className="space-y-3">
{multi && (
<div className="flex items-center gap-2">
<TabButton active={tab==='l10'} onClick={() => setTab('l10')}>L10</TabButton>
<TabButton active={tab==='l18'} onClick={() => setTab('l18')}>L18</TabButton>
<TabButton active={tab==='lexpert'} onClick={() => setTab('lexpert')}>Expert</TabButton>
</div>
)}
<div className="prose prose-neutral dark:prose-invert max-w-none">
<h2 className="mb-1 text-xl font-semibold">{current.title} — {tab.toUpperCase()}</h2>
<p>{current.text}</p>
</div>
<div className="flex gap-2">
<Button onClick={() => copyToClipboard(current.text)}>Copy Text</Button>
<Button onClick={() => downloadJSON(current, `${current.title}-${tab}.json`)}>Download JSON</Button>
</div>
{current.mindmap && (
<div className="space-y-2">
<h3 className="text-md font-medium">Mindmap</h3>
{/* defer import keeps this component light if no mindmap */}
{/** @ts-expect-error server/client split **/}
<div>
{/* dynamic mindmap renderer */}
</div>
</div>
)}
</div>
)
}
