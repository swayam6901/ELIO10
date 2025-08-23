export const debounce = <F extends (...args: any[]) => void>(fn: F, wait = 500) => {
let t: ReturnType<typeof setTimeout> | null = null
return (...args: Parameters<F>) => {
if (t) clearTimeout(t)
t = setTimeout(() => fn(...args), wait)
}
}
export const qs = (params: Record<string, any>) => {
const usp = new URLSearchParams()
Object.entries(params).forEach(([k, v]) => {
if (v !== undefined && v !== null) usp.set(k, String(v))
})
return usp.toString()
}
export const copyToClipboard = async (text: string) => {
try { await navigator.clipboard.writeText(text); return true } catch { return false }
}
export const downloadJSON = (obj: unknown, filename = 'explanation.json') => {
const blob = new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' })
const url = URL.createObjectURL(blob)
const a = document.createElement('a')
a.href = url
a.download = filename
a.click()
URL.revokeObjectURL(url)
}
export const persist = {
get<T>(key: string, fallback: T): T {
if (typeof window === 'undefined') return fallback
try { const v = localStorage.getItem(key); return v ? (JSON.parse(v) as T) : fallback } catch { return fallback }
},
set<T>(key: string, value: T) {
try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
}
}
