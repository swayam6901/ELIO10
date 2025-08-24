import { createClient } from '@supabase/supabase-js'

// We'll use an API route instead of direct client-side Supabase access
export const trackAnalytics = async (query: string, level: string) => {
  try {
    // Get user agent
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : ''
    
    // Call our API endpoint instead of direct Supabase access
    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        level,
        user_agent: userAgent
      }),
    })
  } catch (error) {
    console.error('Error tracking analytics:', error)
  }
}