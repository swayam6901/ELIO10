'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import MindMap from '@/components/MindMap'
import { trackAnalytics } from '@/utils/analytics'

export default function ExplainPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const level = searchParams.get('level') || 'ELI10'
  
  const [explanation, setExplanation] = useState('')
  const [mindmapData, setMindmapData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showMindmap, setShowMindmap] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchExplanation = async () => {
      if (!query) return
      
      setLoading(true)
      setError('')
      
      try {
        const response = await fetch('/api/explain', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query, level }),
        })
        
        if (!response.ok) {
          throw new Error('Failed to fetch explanation')
        }
        
        const data = await response.json()
        setExplanation(data.explanation)
        setMindmapData(data.mindmap)
        
        // Track analytics
        trackAnalytics(query, level)
      } catch (err) {
        console.error('Error fetching explanation:', err)
        setError('Failed to generate explanation. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    
    fetchExplanation()
  }, [query, level])

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-12">
      <div className="w-full max-w-4xl">
        <div className="mb-6">
          <Link href="/" className="text-primary hover:underline">
            ← Back to Search
          </Link>
        </div>
        
        <div className="glass-card p-6 md:p-8 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-dark">
              {query} <span className="text-primary">({level})</span>
            </h1>
            
            <button
              onClick={() => setShowMindmap(!showMindmap)}
              className={`btn ${showMindmap ? 'btn-primary' : 'btn-outline'}`}
            >
              {showMindmap ? 'Show Text' : 'Show Mindmap'}
            </button>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 py-4">{error}</div>
          ) : showMindmap ? (
            <div className="h-[500px] w-full">
              {mindmapData && <MindMap data={mindmapData} />}
            </div>
          ) : (
            <div className="prose prose-lg max-w-none">
              {explanation.split('\n').map((paragraph, index) => (
                paragraph ? <p key={index}>{paragraph}</p> : <br key={index} />
              ))}
            </div>
          )}
        </div>
        
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold mb-4">Try different levels:</h2>
          <div className="flex flex-wrap gap-3">
            <Link 
              href={`/explain?q=${encodeURIComponent(query)}&level=ELI10`}
              className={`btn ${level === 'ELI10' ? 'btn-primary' : 'btn-outline'}`}
            >
              ELI10
            </Link>
            <Link 
              href={`/explain?q=${encodeURIComponent(query)}&level=ELI18`}
              className={`btn ${level === 'ELI18' ? 'btn-primary' : 'btn-outline'}`}
            >
              ELI18
            </Link>
            <Link 
              href={`/explain?q=${encodeURIComponent(query)}&level=Expert`}
              className={`btn ${level === 'Expert' ? 'btn-primary' : 'btn-outline'}`}
            >
              Expert
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}