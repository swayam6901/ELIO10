'use client'
value={q}
onChange={(e) => { setQ(e.target.value); debouncedExplain(e.target.value, level, mindmap) }}
/>
<Select value={level} onChange={(e) => setLevel(e.target.value as any)}>
<option value="l10">L10 (Kid)</option>
<option value="l18">L18 (Teen)</option>
<option value="lexpert">Expert</option>
<option value="all">All Levels</option>
</Select>
<Switch label="Mindmap" checked={mindmap} onChange={setMindmap} />
<Button type="submit" disabled={loading}>{loading ? 'Generating…' : 'Explain'}</Button>
</form>
</Card>
{error && (
<Card>
<CardTitle>⚠️ Error</CardTitle>
<p className="text-red-600 dark:text-red-400">{error}</p>
<div className="mt-3"><Button onClick={() => fetchExplain(q, level, mindmap)}>Retry</Button></div>
</Card>
)}
{loading && (
<Card>
<div className="animate-pulse space-y-3">
<div className="h-5 w-1/3 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
<div className="h-4 w-full bg-neutral-200 dark:bg-neutral-800 rounded"></div>
<div className="h-4 w-11/12 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
<div className="h-4 w-10/12 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
</div>
</Card>
)}
{!loading && (single || multi) && (
<Card>
{multi ? (
<ResultTabs multi={multi} />
) : (
<ResultTabs single={single!} />
)}
</Card>
)}
{!loading && (single?.mindmap || multi?.l10?.mindmap || multi?.l18?.mindmap || multi?.lexpert?.mindmap) && (
<Card>
<CardTitle>Mindmap</CardTitle>
{single?.mindmap && <Mindmap data={single.mindmap} />}
{multi?.l10?.mindmap && <>
<h4 className="mt-2 font-medium">L10</h4>
<Mindmap data={multi.l10.mindmap} />
</>}
{multi?.l18?.mindmap && <>
<h4 className="mt-2 font-medium">L18</h4>
<Mindmap data={multi.l18.mindmap} />
</>}
{multi?.lexpert?.mindmap && <>
<h4 className="mt-2 font-medium">Expert</h4>
<Mindmap data={multi.lexpert.mindmap} />
</>}
</Card>
)}
<footer className="pt-6 text-sm opacity-70">
<p>Stateless MVP • No DB for responses • Usage logged server-side</p>
</footer>
</div>
)
}
