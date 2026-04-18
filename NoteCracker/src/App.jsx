import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import './App.css'
import FlashcardGenerator from './Components/FlashcardGenerator'


const supabase = createClient(//for referencing my .env file
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

function App() {
  
  const [notes, setNotes] = useState('')        // tracks textarea
  const [savedNotes, setSavedNotes] = useState('') // triggers generator

  const handleInsert = async () => {//saving user notes into supabase 
    if (!notes.trim()) return

    const { error } = await supabase
      .from('Study Content')
      .insert([{ Notes: notes }])

    if (error) {
      console.error(error)
      return
    }

    setSavedNotes(notes)  // triggers FlashcardGenerator
    setNotes('')
  }

  return (
    <main>
      <h1>NoteCracker</h1>
      <p>Insert Your Study Notes Here and NoteCracker Will Create Your Personal Study Flashcards!</p>
      <textarea
        value={notes}
        onChange={e => setNotes(e.target.value)}
        placeholder="Paste your notes here..."
      />
      <button onClick={handleInsert}>Create Flashcards</button> 
      <FlashcardGenerator notes={notes} />
    </main>
  )

  
}

export default App