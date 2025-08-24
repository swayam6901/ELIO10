'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface AnalyticsData {
  id: string
  ip_address: string
  query: string
  level: string
  created_at: string
  clicks: number
  user_agent: string
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })
      
      const data = await response.json()
      
      if (response.ok && data.success) {
        setIsAuthenticated(true)
        fetchAnalytics()
      } else {
        setError(data.error || 'Invalid password')
      }
    } catch (err) {
      setError('Authentication failed')
    }
  }

  const fetchAnalytics = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/analytics')
      
      if (!response.ok) {
        throw new Error('Failed to fetch analytics data')
      }
      
      const data = await response.json()
      setAnalyticsData(data)
    } catch (err) {
      console.error('Error fetching analytics:', err)
      setError('Failed to load analytics data')
    } finally {
      setLoading(false)
    }
  }

  // Calculate summary statistics
  const totalUsers = new Set(analyticsData.map(item => item.ip_address)).size
  const totalSearches = analyticsData.reduce((sum, item) => sum + item.clicks, 0)
  
  // Group by IP address
  const ipGroups: Record<string, AnalyticsData[]> = {}
  analyticsData.forEach(item => {
    if (!ipGroups[item.ip_address]) {
      ipGroups[item.ip_address] = []
    }
    ipGroups[item.ip_address].push(item)
  })

  if (!isAuthenticated) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
        <div className="glass-card w-full max-w-md p-8">
          <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
          
          {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            
            <button type="submit" className="w-full btn-primary py-3">
              Login
            </button>
          </form>
          
          <div className="mt-4 text-center">
            <Link href="/" className="text-primary hover:underline">
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-12">
      <div className="w-full max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-dark">Admin Dashboard</h1>
          <Link href="/" className="text-primary hover:underline">
            Back to Home
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-2">Total Users</h2>
            <p className="text-4xl font-bold text-primary">{totalUsers}</p>
          </div>
          
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-2">Total Searches</h2>
            <p className="text-4xl font-bold text-primary">{totalSearches}</p>
          </div>
          
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-2">Unique Queries</h2>
            <p className="text-4xl font-bold text-primary">
              {new Set(analyticsData.map(item => item.query)).size}
            </p>
          </div>
        </div>
        
        <div className="glass-card p-6">
          <h2 className="text-2xl font-semibold mb-4">User Activity</h2>
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 py-4">{error}</div>
          ) : (
            <div className="space-y-8">
              {Object.entries(ipGroups).map(([ip, items]) => (
                <div key={ip} className="border-b border-gray-200 pb-6 last:border-0">
                  <h3 className="text-lg font-medium mb-2">
                    IP: {ip} <span className="text-gray-500">({items.length} queries)</span>
                  </h3>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Query</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clicks</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {items.map(item => (
                          <tr key={item.id}>
                            <td className="px-4 py-2 whitespace-nowrap">{item.query}</td>
                            <td className="px-4 py-2 whitespace-nowrap">{item.level}</td>
                            <td className="px-4 py-2 whitespace-nowrap">{item.clicks}</td>
                            <td className="px-4 py-2 whitespace-nowrap">
                              {new Date(item.created_at).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}