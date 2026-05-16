import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import './App.css'
import FlashcardGenerator from './Components/FlashcardGenerator'
import logo from './IconColor.png';

const supabase = createClient(//for referencing my .env file
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

function App() {
  const [notes, setNotes] = useState('') //tracks text area
  const [generate, setGenerate] = useState(false)

  const handleCreate = async () => {
    if (!notes.trim()) return

    const { error } = await supabase
      .from('Study Content')
      .insert([{ Notes: notes }])

    if (error) {
      console.error(error)
      return
    }

    setGenerate(true) // triggers the flash card generator
  }

  return (
    <main>
      <div id="app-wrapper">
        <div className="app-header">
          <div className="app-badge">
            <div className="app-badge-dot" />
            <span>study tool</span>
          </div>
          <img src={logo} alt="NoteCracker" id="AppName" />
          <p id="Text1">Paste your notes and get instant AI-powered flashcards.</p>
        </div>
  
        <div className="input-card">
          <label className="input-label">Your notes</label>
          <textarea
            id="TextBox"
            value={notes}
            onChange={e => { setNotes(e.target.value); setGenerate(false); }}
            placeholder="Paste lecture notes, textbook excerpts, anything..."
          />
          <div className="input-footer">
            <span className="char-count">{notes.length} characters</span>
            <button id="Button" onClick={handleCreate} disabled={!notes.trim()}>
              Generate flashcards →
            </button>
          </div>
        </div>
  
        <FlashcardGenerator notes={notes} generate={generate} />
      </div>
    </main>
  )
}
export default App