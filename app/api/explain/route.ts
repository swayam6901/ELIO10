"use client"
import { useState } from "react"

// Puter.js ko window.puter se access karte hain
declare global {
  interface Window {
    puter: any
  }
}

export default function Explainer() {
  const [query, setQuery] = useState("")
  const [level, setLevel] = useState("ELI10")
  const [explanation, setExplanation] = useState("")
  const [mindmap, setMindmap] = useState<any>(null)

  const handleGenerate = async () => {
    const explanationPrompt = generateExplanationPrompt(query, level)
    const mindmapPrompt = generateMindmapPrompt(query, level)

    // AI calls via Puter.js
    const explanationResp = await window.puter.ai.chat(explanationPrompt, { model: "gpt-5-nano" })
    setExplanation(explanationResp.message?.content || "")

    const mindmapResp = await window.puter.ai.chat(mindmapPrompt, { model: "gpt-5-nano" })
    try {
      const jsonMatch = mindmapResp.message.content.match(/\{[\s\S]*\}/)
      setMindmap(JSON.parse(jsonMatch ? jsonMatch[0] : mindmapResp.message.content))
    } catch {
      setMindmap({ topic: query, children: [] })
    }
  }

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Enter concept"/>
      <select value={level} onChange={e => setLevel(e.target.value)}>
        <option value="ELI10">ELI10</option>
        <option value="ELI18">ELI18</option>
        <option value="Expert">Expert</option>
      </select>
      <button onClick={handleGenerate}>Generate</button>

      <h2>Explanation</h2>
      <pre>{explanation}</pre>

      <h2>Mindmap JSON</h2>
      <pre>{JSON.stringify(mindmap, null, 2)}</pre>
    </div>
  )
}

// Helper functions
function generateExplanationPrompt(query: string, level: string) {
  return `Explain the concept of "${query}" at ${level} level.`
}
function generateMindmapPrompt(query: string, level: string) {
  return `Create a mindmap for "${query}" in JSON format.`
}
