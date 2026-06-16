import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { flashcards } from '../../data/curriculum'
import { motion, AnimatePresence } from 'framer-motion'

export default function ExamSprint() {
  const navigate = useNavigate()
  const [cardIndex, setCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15 * 60)
  const [results, setResults] = useState({ correct: 0, review: 0, skipped: 0 })
  const [showResults, setShowResults] = useState(false)

  const card = flashcards[cardIndex]
  const isDanger = timeLeft <= 60
  const totalCards = flashcards.length

  // Timer
  useEffect(() => {
    if (showResults) return
    const interval = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(interval); setShowResults(true); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [showResults])

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  const flip = useCallback(() => { if (!isFlipped) setIsFlipped(true) }, [isFlipped])

  const next = useCallback((outcome) => {
    setResults(r => ({ ...r, [outcome]: r[outcome] + 1 }))
    setIsFlipped(false)
    setTimeout(() => {
      if (cardIndex >= totalCards - 1) { setShowResults(true) }
      else setCardIndex(i => i + 1)
    }, 300)
  }, [cardIndex, totalCards])

  const skip = () => next('skipped')

  useEffect(() => {
    const handler = (e) => {
      if (e.code === 'Space') { e.preventDefault(); flip() }
      if (e.key === '1' && isFlipped) next('review')
      if (e.key === '2' && isFlipped) next('correct')
      if (e.key === 's' && !isFlipped) skip()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isFlipped, flip, next])

  if (showResults) {
    const total = results.correct + results.review + results.skipped
    const accuracy = total > 0 ? Math.round((results.correct / total) * 100) : 0
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full px-6"
        >
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>
            </div>
            <h2 className="font-heading text-4xl text-text-main mb-2">Sprint Complete!</h2>
            <p className="text-muted font-body">Biology: Cell Structure</p>
          </div>
          <div className="bg-surface border border-border rounded p-6 space-y-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-muted text-sm font-body">Accuracy</span>
              <span className="font-mono text-2xl font-semibold text-primary">{accuracy}%</span>
            </div>
            <div className="h-px bg-border" />
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-mono font-semibold text-success">{results.correct}</p>
                <p className="text-xs text-muted font-mono uppercase tracking-wider mt-1">Got It</p>
              </div>
              <div>
                <p className="text-2xl font-mono font-semibold text-danger">{results.review}</p>
                <p className="text-xs text-muted font-mono uppercase tracking-wider mt-1">Review</p>
              </div>
              <div>
                <p className="text-2xl font-mono font-semibold text-muted">{results.skipped}</p>
                <p className="text-xs text-muted font-mono uppercase tracking-wider mt-1">Skipped</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => { setCardIndex(0); setIsFlipped(false); setResults({ correct: 0, review: 0, skipped: 0 }); setTimeLeft(15 * 60); setShowResults(false) }}
              className="flex-1 scholar-btn-primary justify-center py-3">
              <span className="material-symbols-outlined text-[16px]">refresh</span>
              Retry Sprint
            </button>
            <button onClick={() => navigate('/scholar/dashboard')} className="scholar-btn-ghost">
              Dashboard
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden">
      {/* Exit */}
      <div className="absolute top-0 w-full p-6 flex justify-between items-center">
        <button onClick={() => navigate('/scholar/dashboard')}
          className="flex items-center gap-2 text-muted hover:text-text-main transition-colors text-sm font-mono uppercase tracking-wider">
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Exit Sprint
        </button>
        <div className="flex items-center gap-4">
          <span className="text-muted text-xs font-mono uppercase tracking-wider">Card {cardIndex + 1}/{totalCards}</span>
          <div className="flex gap-1.5">
            {flashcards.slice(0, Math.min(totalCards, 12)).map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full transition-colors" style={{
                backgroundColor: i < cardIndex ? '#00C853' : i === cardIndex ? '#FF8A00' : '#2C313D'
              }} />
            ))}
          </div>
        </div>
      </div>

      <main className="flex flex-col items-center w-full max-w-[800px] px-4 gap-8">
        {/* Timer */}
        <div className="text-center">
          <h2 className="text-muted text-xs font-mono uppercase tracking-widest mb-2">{card.subject}: {card.chapter}</h2>
          <div
            id="sprint-timer"
            className={`font-mono text-[56px] font-semibold tracking-tight leading-none transition-colors ${isDanger ? 'timer-danger' : 'text-text-main'}`}
          >
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Flashcard */}
        <div className="perspective-1000 w-full max-w-[640px] h-[380px] relative">
          <div
            className={`flashcard w-full h-full absolute cursor-pointer`}
            style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
            onClick={flip}
          >
            {/* Front */}
            <div className="flashcard-face absolute inset-0 flex flex-col items-center justify-center p-12 text-center rounded border border-border bg-surface">
              <span className="absolute top-5 left-5 text-muted text-[11px] font-mono uppercase tracking-wider">Card {cardIndex + 1} / {totalCards}</span>
              <span className="absolute top-5 right-5">
                <span className="scholar-tag text-[10px]">{card.subject}</span>
              </span>
              <h1 className="font-heading text-[28px] leading-tight text-text-main">{card.question}</h1>
              <p className="text-muted font-body text-sm max-w-md mt-6 opacity-60">
                Press <kbd className="font-mono bg-background border border-border px-1.5 py-0.5 rounded text-xs mx-1">Space</kbd> or click to reveal
              </p>
            </div>
            {/* Back */}
            <div className="flashcard-face flashcard-back absolute inset-0 flex flex-col items-center justify-center p-12 text-center rounded border border-primary bg-surface-hover">
              <span className="absolute top-5 left-5 text-primary text-[11px] font-mono uppercase tracking-wider">Answer</span>
              <p className="font-body text-lg text-text-main leading-relaxed">{card.answer}</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="w-full max-w-[640px]">
          <AnimatePresence mode="wait">
            {!isFlipped ? (
              <motion.div key="default" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="flex gap-3">
                <button onClick={flip} className="flex-1 scholar-btn-primary justify-center py-3 h-12">
                  <span className="material-symbols-outlined text-[16px]">visibility</span>
                  Reveal Answer
                </button>
                <button onClick={skip} className="w-[120px] scholar-btn-ghost h-12 justify-center flex items-center">
                  Skip <span className="text-muted text-xs font-mono ml-2">[S]</span>
                </button>
              </motion.div>
            ) : (
              <motion.div key="review" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="flex gap-3">
                <button onClick={() => next('review')}
                  className="flex-1 h-12 bg-surface border border-border text-text-main font-body font-semibold text-sm uppercase tracking-wider rounded hover:bg-surface-hover transition-all flex items-center justify-center gap-2 group">
                  <span className="text-muted text-xs mr-1 font-mono group-hover:text-text-main">[1]</span>
                  Needs Review
                  <span className="material-symbols-outlined text-danger text-[16px] ml-1">history</span>
                </button>
                <button onClick={() => next('correct')}
                  className="flex-1 h-12 bg-surface border border-success text-text-main font-body font-semibold text-sm uppercase tracking-wider rounded hover:bg-success/10 transition-all flex items-center justify-center gap-2 group">
                  <span className="text-muted text-xs mr-1 font-mono group-hover:text-text-main">[2]</span>
                  Got It
                  <span className="material-symbols-outlined text-success text-[16px] ml-1">check_circle</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Progress */}
        <div className="w-full max-w-[640px] flex items-center gap-4 opacity-60">
          <span className="text-xs font-mono text-muted">{Math.round((cardIndex / totalCards) * 100)}%</span>
          <div className="h-1 flex-1 bg-surface rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${(cardIndex / totalCards) * 100}%` }} />
          </div>
          <span className="text-xs font-mono text-muted">{totalCards - cardIndex} left</span>
        </div>
      </main>
    </div>
  )
}
