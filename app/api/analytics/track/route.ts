import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { headers } from 'next/headers'

// Initialize Supabase client (server-side only)
const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request: Request) {
  try {
    const { query, level, user_agent } = await request.json()
    
    // Get IP address from request headers
    const headersList = headers()
    const ip = headersList.get('x-forwarded-for') || 'unknown'
    
    if (!query || !level) {
      return NextResponse.json(
        { error: 'Query and level are required' },
        { status: 400 }
      )
    }
    
    // Check if this query + IP combination already exists
    const { data: existingData, error: fetchError } = await supabase
      .from('analytics')
      .select('id, clicks')
      .eq('ip_address', ip)
      .eq('query', query)
      .eq('level', level)
      .single()
    
    if (fetchError && fetchError.code !== 'PGRST116') {
      throw fetchError
    }
    
    if (existingData) {
      // Update existing record
      await supabase
        .from('analytics')
        .update({ 
          clicks: (existingData.clicks || 0) + 1,
          user_agent
        })
        .eq('id', existingData.id)
    } else {
      // Insert new record
      await supabase
        .from('analytics')
        .insert([
          { 
            ip_address: ip, 
            query, 
            level, 
            clicks: 1,
            user_agent
          }
        ])
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error tracking analytics:', error)
    return NextResponse.json(
      { error: 'Failed to track analytics' },
      { status: 500 }
    )
  }
}