'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Home() {
  const [query, setQuery] = useState('')
  const [level, setLevel] = useState('ELI10')
  const router = useRouter()
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/explain?q=${encodeURIComponent(query)}&level=${level}`)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="bg-white/30 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 w-full max-w-2xl p-8 space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">ELI<span className="text-blue-600">10</span></h1>
          <p className="text-gray-600">Get explanations for any concept at your preferred level of understanding</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter any concept or topic..."
              className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            <button 
              type="button" 
              onClick={() => setLevel('ELI10')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${level === 'ELI10' ? 'bg-blue-600 text-white' : 'bg-white/50 border border-gray-300 text-gray-700 hover:bg-gray-100'}`}
            >
              ELI10
            </button>
            <button 
              type="button" 
              onClick={() => setLevel('ELI18')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${level === 'ELI18' ? 'bg-blue-600 text-white' : 'bg-white/50 border border-gray-300 text-gray-700 hover:bg-gray-100'}`}
            >
              ELI18
            </button>
            <button 
              type="button" 
              onClick={() => setLevel('Expert')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${level === 'Expert' ? 'bg-blue-600 text-white' : 'bg-white/50 border border-gray-300 text-gray-700 hover:bg-gray-100'}`}
            >
              Expert
            </button>
          </div>
          
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition-colors">
            Explain This
          </button>
        </form>
        
        <div className="text-center text-sm text-gray-500">
          <Link href="/admin" className="hover:text-blue-600">Admin Panel</Link>
        </div>
      </div>
    </main>
  )
}