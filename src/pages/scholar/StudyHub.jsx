import { useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { subjects } from '../../data/curriculum'

const chapter = subjects.science.chapters[0]

const mockMessages = [
  {
    role: 'assistant',
    text: `Welcome to Chapter 1.2 on **Mitosis & Meiosis**. I'm here to clarify concepts or test your knowledge as you review the material.`
  },
]

const suggestions = [
  'Compare Mitosis vs Meiosis',
  'Explain PMAT',
  'What is Interphase?',
]

function renderNotes(md) {
  return md
    .replace(/^## (.+)$/gm, '<h2 class="font-heading text-2xl font-semibold text-text-main mb-4 border-b border-border pb-2 mt-8">$1</h2>')
    .replace(/^\*\*(.+?)\*\*$/gm, '<strong class="block text-white mb-1 font-body">$1</strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>')
    .replace(/^- \*\*(.+?):\*\* (.+)$/gm, '<li class="text-text-main font-body leading-relaxed"><strong class="text-white">$1:</strong> $2</li>')
    .replace(/^- (.+)$/gm, '<li class="text-text-main font-body leading-relaxed">$1</li>')
    .replace(/`(.+?)`/g, '<code class="bg-surface-hover text-primary px-1 rounded font-mono text-sm">$1</code>')
    .replace(/^(.+)$/gm, s => s.startsWith('<') ? s : `<p class="font-body text-text-main leading-relaxed text-base">${s}</p>`)
}

export default function StudyHub() {
  const navigate = useNavigate()
  const [activeTopicIdx, setActiveTopicIdx] = useState(2)
  const [messages, setMessages] = useState(mockMessages)
  const [input, setInput] = useState('')
  const chatRef = useRef(null)

  const activeTopic = chapter.subtopics[activeTopicIdx]

  const sendMessage = useCallback(() => {
    if (!input.trim()) return
    const userMsg = { role: 'user', text: input.trim() }
    const aiResponses = {
      'Compare Mitosis vs Meiosis': 'Mitosis produces 2 identical diploid cells for growth/repair. Meiosis produces 4 unique haploid cells for sexual reproduction with 2 division stages.',
      'Explain PMAT': 'PMAT stands for the 4 phases of Mitosis: **Prophase** (chromosomes condense), **Metaphase** (align at equator), **Anaphase** (chromatids separate), **Telophase** (nuclear envelope reforms).',
      'What is Interphase?': 'Interphase is the resting stage before cell division where the cell grows (G1), replicates DNA (S phase), and prepares for division (G2). It takes ~90% of the cell cycle.',
    }
    const aiText = aiResponses[input.trim()] || `Great question about "${input.trim()}"! In the context of ${activeTopic?.title ?? 'this chapter'}, you should focus on the key mechanisms and their biological significance. Consider reviewing your notes on this section.`
    setMessages(m => [...m, userMsg, { role: 'assistant', text: aiText }])
    setInput('')
    setTimeout(() => {
      chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' })
    }, 100)
  }, [input, activeTopic])

  return (
    <div className="flex flex-col h-screen">
      {/* Top bar */}
      <header className="h-12 border-b border-border flex items-center px-4 flex-shrink-0 bg-surface z-10">
        <button
          onClick={() => navigate('/scholar/dashboard')}
          className="flex items-center text-muted hover:text-text-main transition-colors mr-4 group"
        >
          <span className="material-symbols-outlined mr-1.5 text-[18px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
          <span className="text-[12px] font-mono uppercase tracking-wide">Dashboard</span>
        </button>
        <div className="h-4 w-px bg-border mx-2" />
        <span className="font-heading text-xl font-semibold text-text-main">Cellular Biology</span>
        <span className="mx-2 text-muted text-sm">•</span>
        <span className="text-sm text-muted font-mono">Unit 2</span>
        <div className="ml-auto flex items-center gap-4">
          <div className="text-[12px] font-mono text-primary flex items-center">
            <span className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse" />
            Session Active
          </div>
          <button
            onClick={() => navigate('/scholar/exam-sprint')}
            className="scholar-btn-primary py-1.5 px-4 text-xs"
          >
            <span className="material-symbols-outlined text-[14px]">bolt</span>
            Sprint Mode
          </button>
        </div>
      </header>

      {/* 3-pane layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Chapter Nav */}
        <nav className="w-[220px] flex-shrink-0 bg-background border-r border-border flex flex-col h-full">
          <div className="p-4 border-b border-border flex-shrink-0">
            <h2 className="text-[11px] font-bold text-muted uppercase tracking-widest font-mono">Chapters</h2>
          </div>
          <div className="flex-1 overflow-y-auto py-2">
            <ul className="space-y-[1px]">
              {chapter.subtopics.map((t, i) => (
                <li key={t.id}>
                  <button
                    onClick={() => setActiveTopicIdx(i)}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors border-l-2 ${
                      i === activeTopicIdx
                        ? 'bg-surface text-text-main border-primary'
                        : 'border-transparent text-muted hover:bg-surface-hover hover:text-text-main'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span className={`font-mono text-[11px] mt-[2px] ${i === activeTopicIdx ? 'text-primary' : ''}`}>{t.num}</span>
                      <span className={i === activeTopicIdx ? 'font-medium' : ''}>{t.title}</span>
                    </div>
                    {t.done && <span className="ml-6 text-success text-[10px] font-mono">✓ done</span>}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 border-t border-border bg-surface flex-shrink-0">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[11px] font-mono text-muted">Progress</span>
              <span className="text-[11px] font-mono text-text-main">40%</span>
            </div>
            <div className="h-1 w-full bg-background rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: '40%' }} />
            </div>
          </div>
        </nav>

        {/* Center: Content */}
        <section className="flex-1 min-w-0 flex flex-col bg-surface h-full overflow-hidden">
          {/* YouTube Player */}
          <div className="w-full bg-black flex-shrink-0 border-b border-border">
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${chapter.videoId}?rel=0&modestbranding=1`}
                title="Chapter Video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
          {/* Notes */}
          <div className="flex-1 overflow-y-auto p-8 lg:px-14">
            <div className="max-w-3xl mx-auto">
              <header className="border-b border-border pb-6 mb-8">
                <div className="flex items-center gap-2 mb-2 text-primary font-mono text-[12px]">
                  <span className="material-symbols-outlined text-[14px]">book</span>
                  <span>CHAPTER {activeTopic?.num}</span>
                </div>
                <h1 className="font-heading text-4xl font-semibold text-text-main tracking-tight leading-tight">{activeTopic?.title}</h1>
                <p className="text-muted mt-3 text-base leading-relaxed font-body">Understanding the fundamental processes of cell division, replication, and genetic distribution.</p>
              </header>
              <article
                className="space-y-4 [&_ul]:list-disc [&_ul]:list-inside [&_ul]:space-y-2 [&_ul]:mt-4 [&_ul]:marker:text-primary"
                dangerouslySetInnerHTML={{ __html: renderNotes(chapter.notes) }}
              />
              <div className="mt-12 pt-8 border-t border-border">
                <div className="flex gap-3">
                  <button
                    onClick={() => navigate('/scholar/exam-sprint')}
                    className="scholar-btn-primary"
                  >
                    <span className="material-symbols-outlined text-[16px]">quiz</span>
                    Take Chapter Quiz
                  </button>
                  <button
                    onClick={() => navigate('/scholar/topic-explorer')}
                    className="scholar-btn-ghost"
                  >
                    Next Topic →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right: AI Chat */}
        <aside className="w-[300px] flex-shrink-0 bg-background border-l border-border flex flex-col h-full">
          <div className="p-4 border-b border-border flex-shrink-0 bg-surface flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
              <h2 className="text-[12px] font-bold text-text-main uppercase tracking-widest font-mono">Study Assistant</h2>
            </div>
            <button className="text-muted hover:text-text-main transition-colors">
              <span className="material-symbols-outlined text-[16px]">more_horiz</span>
            </button>
          </div>

          <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
            {messages.map((msg, i) => (
              <div key={i} className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <span className="text-[10px] font-mono text-muted uppercase tracking-wider mx-1">
                  {msg.role === 'user' ? 'You' : 'Assistant'}
                </span>
                <div
                  className={`rounded px-3 py-2.5 text-[13px] leading-relaxed max-w-[92%] font-body ${
                    msg.role === 'user'
                      ? 'bg-surface-hover border border-border text-text-main rounded-tr-none'
                      : 'bg-surface border border-border text-text-main rounded-tl-none'
                  }`}
                  dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>') }}
                />
              </div>
            ))}
            {/* Suggestion chips */}
            <div className="flex flex-wrap gap-2">
              {suggestions.map(s => (
                <button key={s} onClick={() => { setInput(s) }} className="scholar-tag text-[11px]">{s}</button>
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-border bg-surface flex-shrink-0">
            <div className="relative">
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }}
                placeholder="Ask a question..."
                rows={1}
                className="w-full bg-background border border-border rounded text-[13px] text-text-main placeholder-muted px-3 py-2.5 pr-10 resize-none focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all font-body"
                style={{ minHeight: '44px', maxHeight: '120px' }}
              />
              <button
                onClick={sendMessage}
                className="absolute right-2 bottom-2 w-6 h-6 flex items-center justify-center text-muted hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-[16px] -rotate-90">send</span>
              </button>
            </div>
            <div className="flex justify-between items-center mt-2 px-1">
              <span className="text-[10px] text-muted font-mono">Context: Current Section</span>
              <button onClick={() => setMessages(mockMessages)} className="text-[10px] text-muted font-mono hover:text-primary cursor-pointer transition-colors">
                Clear Chat
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
