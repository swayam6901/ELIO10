import { NextRequest, NextResponse } from 'next/server'
export async function GET(req: NextRequest) {
const url = new URL(req.url)
const q = url.searchParams.get('q')
const level = url.searchParams.get('level')
const mindmap = url.searchParams.get('mindmap')
const backend = process.env.BACKEND_URL
if (!backend) return NextResponse.json({ error: 'BACKEND_URL not configured' }, { status: 500 })
if (!q || !level) return NextResponse.json({ error: 'Missing q or level' }, { status: 400 })
const resp = await fetch(`${backend}/api/explain?q=${encodeURIComponent(q)}&level=${level}&mindmap=${mindmap}`, {
// Forward only necessary headers
headers: { 'x-forwarded-for': req.headers.get('x-forwarded-for') || '' }
})
const data = await resp.json()
return NextResponse.json(data, { status: resp.status })
}
