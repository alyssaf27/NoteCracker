import { useState, useEffect } from 'react'

function FlashcardGenerator({ notes }) {//passing Notes prop for generator to use
  const [flashcards, setFlashcards] = useState([])

  useEffect(() => {
    if (!notes.trim()) return
    generateFlashcards()
  }, [notes])  // ensures generator runs when they get new set of notes

  const generateFlashcards = async () => {
    const response = await fetch('https://api.anthropic.com/v1/messages', {//connecting to claude api
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{//prompt claude and pass Notes user inserted 
          role: 'user',
          content: `Create 5 flashcards from these notes. Return JSON only, no extra text, in this format:
          [{"question": "...", "answer": "..."}]
          
          Notes: ${notes}`
        }]
      })
    })

    const data = await response.json()
    const text = data.content[0].text
    const parsed = JSON.parse(text)
    setFlashcards(parsed)
  }

  return (
    <div>
      {/* FlashcardDeck componenet here when I build it */}
    </div>
  )
}

export default FlashcardGenerator