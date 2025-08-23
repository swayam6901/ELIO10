'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardTitle, CardContent } from '@/components/ui/card'
import { Select } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import Mindmap from '@/components/mindmap'
import ResultTabs from '@/components/result-tabs'

type Level = 'l10' | 'l18' | 'lexpert' | 'all'

export default function HomePage() {
  const [q, setQ] = useState('')
  const [level, setLevel] = useState<Level>('l10')
  const [mindmap, setMindmap] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [single, setSingle] = useState<any>(null)
  const [multi, setMulti] = useState<any>(null)

  async function fetchExplain(query: string, lvl: Level, mm: boolean) {
    if (!query) return
    try {
      setLoading(true)
      setError(null)
      setSingle(null)
      setMulti(null)

      if (lvl === 'all') {
        const res = await fetch(`/api/explain-all?q=${encodeURIComponent(query)}&mindmap=${mm}`)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        setMulti(data)
      } else {
        const res = await fetch(`/api/explain?q=${encodeURIComponent(query)}&level=${lvl}&mindmap=${mm}`)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        setSingle(data)
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <Card>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              fetchExplain(q, level, mindmap)
            }}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Enter a topic (e.g. Quantum Computer)"
              className="w-full border rounded p-2"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />

            <Select value={level} onChange={(e) => setLevel(e.target.value as Level)}>
              <option value="l10">L10 (Kid)</option>
              <option value="l18">L18 (Teen)</option>
              <option value="lexpert">Expert</option>
              <option value="all">All Levels</option>
            </Select>

            <div className="flex items-center gap-2">
              <Switch label="Mindmap" checked={mindmap} onChange={setMindmap} />
              <span className="text-sm opacity-70">Include Mindmap</span>
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? 'Generating…' : 'Explain'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Card>
          <CardTitle>⚠️ Error</CardTitle>
          <CardContent>
            <p className="text-red-600 dark:text-red-400">{error}</p>
            <div className="mt-3">
              <Button onClick={() => fetchExplain(q, level, mindmap)}>Retry</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {loading && (
        <Card>
          <CardContent>
            <div className="animate-pulse space-y-3">
              <div className="h-5 w-1/3 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
              <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-800 rounded"></div>
              <div className="h-4 w-11/12 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
              <div className="h-4 w-10/12 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
            </div>
          </CardContent>
        </Card>
      )}

      {!loading && (single || multi) && (
        <Card>
          <CardContent>
            {multi ? <ResultTabs multi={multi} /> : <ResultTabs single={single!} />}
          </CardContent>
        </Card>
      )}

      {!loading &&
        (single?.mindmap ||
          multi?.l10?.mindmap ||
          multi?.l18?.mindmap ||
          multi?.lexpert?.mindmap) && (
        <Card>
          <CardTitle>Mindmap</CardTitle>
          <CardContent>
            {single?.mindmap && <Mindmap data={single.mindmap} />}
            {multi?.l10?.mindmap && (
              <>
                <h4 className="mt-2 font-medium">L10</h4>
                <Mindmap data={multi.l10.mindmap} />
              </>
            )}
            {multi?.l18?.mindmap && (
              <>
                <h4 className="mt-2 font-medium">L18</h4>
                <Mindmap data={multi.l18.mindmap} />
              </>
            )}
            {multi?.lexpert?.mindmap && (
              <>
                <h4 className="mt-2 font-medium">Expert</h4>
                <Mindmap data={multi.lexpert.mindmap} />
              </>
            )}
          </CardContent>
        </Card>
      )}

      <footer className="pt-6 text-sm opacity-70 text-center">
        <p>Stateless MVP • Responses are not cached • Logs stored server-side</p>
      </footer>
    </div>
  )
}
