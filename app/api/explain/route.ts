import { NextResponse } from 'next/server'
import OpenAI from 'openai'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

export async function POST(request: Request) {
  try {
    const { query, level } = await request.json()

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      )
    }

    // Generate explanation based on level
    const explanationPrompt = generateExplanationPrompt(query, level)
    const explanationResponse = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: explanationPrompt,
        },
      ],
      temperature: 0.7,
    })

    const explanation = explanationResponse.choices[0]?.message?.content || ''

    // Generate mindmap data
    const mindmapPrompt = generateMindmapPrompt(query, level)
    const mindmapResponse = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: mindmapPrompt,
        },
      ],
      temperature: 0.7,
    })

    let mindmap = {}
    try {
      const mindmapContent = mindmapResponse.choices[0]?.message?.content || ''
      // Extract JSON from the response (in case there's any extra text)
      const jsonMatch = mindmapContent.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        mindmap = JSON.parse(jsonMatch[0])
      } else {
        mindmap = JSON.parse(mindmapContent)
      }
    } catch (error) {
      console.error('Error parsing mindmap JSON:', error)
      mindmap = {
        topic: query,
        children: [],
      }
    }

    return NextResponse.json({
      explanation,
      mindmap,
    })
  } catch (error) {
    console.error('Error generating explanation:', error)
    return NextResponse.json(
      { error: 'Failed to generate explanation' },
      { status: 500 }
    )
  }
}

function generateExplanationPrompt(query: string, level: string) {
  let prompt = `Explain the concept of "${query}" `

  switch (level) {
    case 'ELI10':
      prompt += `in simple terms that a 10-year-old would understand. Use simple vocabulary, short sentences, and relatable examples. Avoid complex terminology, and if you must use it, explain it immediately. Break down complex ideas into simple concepts. The explanation should be educational but fun and engaging.`
      break
    case 'ELI18':
      prompt += `at a high school graduate level (18-year-old). You can use more advanced vocabulary and concepts, but still avoid highly technical jargon without explanation. Provide more detailed explanations and examples that would be relevant to a young adult. The tone should be educational but conversational.`
      break
    case 'Expert':
      prompt += `at an expert level, assuming the reader has advanced knowledge in the field. Use proper terminology, detailed explanations, and sophisticated concepts. Reference relevant theories, research, or principles when appropriate. The tone should be professional and academic.`
      break
    default:
      prompt += `in simple terms that a 10-year-old would understand.`
  }

  return prompt
}

function generateMindmapPrompt(query: string, level: string) {
  let complexity = 'simple'
  if (level === 'ELI18') complexity = 'moderate'
  if (level === 'Expert') complexity = 'complex'

  return `Create a ${complexity} mindmap for the concept "${query}" in JSON format. 
  The mindmap should have a hierarchical structure with the main concept as the root node, and related subconcepts as child nodes.
  
  The JSON structure should follow this format:
  {
    "topic": "Main Concept",
    "children": [
      {
        "name": "Subconcept 1",
        "children": [
          { "name": "Detail 1" },
          { "name": "Detail 2" }
        ]
      },
      {
        "name": "Subconcept 2",
        "children": [
          { "name": "Detail 3" },
          { "name": "Detail 4" }
        ]
      }
    ]
  }
  
  For ${level} level, include ${
    level === 'ELI10'
      ? '3-5 main subconcepts with 2-3 details each'
      : level === 'ELI18'
      ? '5-7 main subconcepts with 3-4 details each'
      : '7-10 main subconcepts with 4-6 details each, including technical terminology'
  }.
  
  Return ONLY the JSON object with no additional text or explanation.`
}