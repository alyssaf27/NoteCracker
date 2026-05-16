NoteCracker

Turn your semester notes into flashcards instantly — built for finals season.

Project Overview

NoteCracker is an AI-powered study tool that lets you paste your notes and instantly generate flashcards to help you study. Built during finals season, the goal was to make reviewing material faster and more effective by letting AI do the heavy lifting of breaking notes down into digestible question-and-answer cards.
Live Demo
🔗 [NoteCracker](https://note-cracker-da7wg59je-alyssa-falcon-s-projects.vercel.app/)

Technologies Used

  React — frontend UI
  Vite — build tool and dev server
  Supabase — database and backend 
  Groq API — AI flashcard generation (free tier)
  Figma — custom logo design
  Vercel — deployment, connected directly to GitHub
  CSS — custom styling and flashcard flip animation

Installation & Setup

Clone the repository

bash   git clone https://github.com/alyssaf27/NoteCracker.git
   cd NoteCracker

Install dependencies

bash   npm install

Set up environment variables
Create a .env file in the NoteCracker folder:

   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_GROQ_API_KEY=your_groq_api_key

Run locally

bash   npm run dev

Process & What I Learned

AI Integration
I originally wanted to use the Claude API for flashcard generation but pivoted to Groq, which offered a free tier with enough credits for this project. Figuring out how to incorporate an AI API was one of the harder parts — I watched YouTube tutorials and researched browser-compatible AI options to find the right fit.

Backend Confidence
At the start of the year, backend development made me nervous. By the end of this project I feel confident implementing a database like Supabase with PostgreSQL, and I understand how to structure a project around the database first before building out components.

Organization & Component Thinking
Watching Professor Cam's videos taught me to always think in components. My workflow became: set up the database → plan the components → incorporate AI → style with CSS. That order made the whole process much smoother.

Deployment
I learned how to use Vercel with direct GitHub integration, which automatically redeploys on every push. This is something I plan to use for my personal portfolio going forward.

Design
I designed a custom logo in Figma and imported it directly into the app, which was a fun way to incorprate my interest in Design.

Flashcard Animation
The card flip animation was built with CSS following a 🔗[YouTube tutorial](https://www.youtube.com/watch?v=OI-en_lnI9k)

AI Tools Used
Groq API — generates flashcards from pasted notes
Claude (Anthropic) — used during development to research AI options and troubleshoot implementation
