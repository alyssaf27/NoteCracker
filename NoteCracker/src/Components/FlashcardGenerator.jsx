import { useState, useEffect } from 'react'
import FlashCardDeck from './FlashcardDeck'

function FlashcardGenerator({ notes, generate }) {
  const [flashcards, setFlashcards] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!generate || !notes?.trim()) return
    generateFlashcards()
  }, [generate]) // only fires when generate flips to true

  const generateFlashcards = async () => {
    setLoading(true)
    setError(null)

    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY

      const prompt = `You are a flashcard generator. Given the following notes, generate a list of 5-10 flashcards to help a student study the material.

Return ONLY a valid JSON array with no markdown, no code fences, and no explanation. Each object must have a "front" (question) and "back" (answer) field.

Example format:
[{"front": "Question?", "back": "Answer"}, ...]

Notes:
${notes}`

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.4,
        }),
      })

      if (!response.ok) {
        const errData = await response.json()
        throw new Error(errData.error?.message || 'Groq API request failed')
      }

      const data = await response.json()
      const rawText = data.choices?.[0]?.message?.content

      if (!rawText) throw new Error('No content returned from Groq')

      const cleaned = rawText.replace(/```json|```/g, '').trim()
      const parsed = JSON.parse(cleaned)

      if (!Array.isArray(parsed)) throw new Error('Unexpected response format')

      setFlashcards(parsed)
    } catch (err) {
      console.error('Full error:', err)
      setError(`Error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <p>Generating flashcards...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <FlashCardDeck cards={flashcards} />
    </div>
  )
}

export default FlashcardGenerator