import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { subjects } from '../../data/curriculum'

const chapter = subjects.science.chapters[0]

const mockMessages = [
  { role: 'assistant', text: "Hi Explorer! 👋 I'm your Study Buddy. Let's learn about Cell Structure together! Ask me anything." }
]

export default function LearningSpace() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState(mockMessages)
  const [input, setInput] = useState('')
  const chatRef = useRef(null)

  const send = () => {
    if (!input.trim()) return
    const ai = 'That\'s a great question! Think of it like this: ' + input.trim() + ' is one of the most fascinating parts of biology. Keep exploring and you\'ll master it! 🌟'
    setMessages(m => [...m, { role: 'user', text: input.trim() }, { role: 'assistant', text: ai }])
    setInput('')
    setTimeout(() => chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' }), 100)
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="h-12 border-b border-border-structural flex items-center px-5 flex-shrink-0 bg-surface">
        <button onClick={() => navigate('/explorer/dashboard')} className="flex items-center text-muted hover:text-text-main gap-1.5 mr-4 group text-sm">
          <span className="material-symbols-outlined text-[16px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
          <span className="label-caps text-[10px]">Dashboard</span>
        </button>
        <div className="h-4 w-px bg-border-structural mx-2" />
        <span className="font-body font-semibold text-text-main">Learning Space</span>
        <span className="mx-2 text-muted">·</span>
        <span className="label-caps text-muted text-[10px]">Oceanic Ecosystems</span>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#00C853' }} />
          <span className="label-caps text-[10px]" style={{ color: '#00C853' }}>SESSION ACTIVE</span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Chapter nav */}
        <nav className="w-[200px] flex-shrink-0 bg-background border-r border-border-structural flex flex-col">
          <div className="p-4 border-b border-border-structural">
            <span className="label-caps text-muted text-[10px]">TOPICS</span>
          </div>
          <div className="flex-1 overflow-y-auto py-2">
            {chapter.subtopics.map((t, i) => (
              <button key={t.id} className={`w-full text-left px-4 py-3 text-sm font-body transition-colors border-l-2 ${
                t.active ? 'border-amber text-text-main bg-surface-hover' : 'border-transparent text-muted hover:text-text-main hover:bg-surface-hover'
              }`} style={{ borderLeftColor: t.active ? '#ffb77f' : 'transparent' }}>
                <div className="flex items-center gap-2">
                  {t.done && <span className="material-symbols-outlined text-[12px]" style={{ color: '#00C853', fontVariationSettings: "'FILL' 1" }}>check_circle</span>}
                  <span>{t.title}</span>
                </div>
              </button>
            ))}
          </div>
          <div className="p-4 border-t border-border-structural">
            <div className="flex justify-between text-xs font-mono text-muted mb-1"><span>Progress</span><span>40%</span></div>
            <div className="h-1.5 w-full bg-border-structural rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: '40%', backgroundColor: '#ffb77f' }} />
            </div>
          </div>
        </nav>

        {/* Video + Content */}
        <section className="flex-1 min-w-0 flex flex-col bg-surface overflow-hidden">
          <div className="w-full bg-black flex-shrink-0 border-b border-border-structural">
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${chapter.videoId}?rel=0&modestbranding=1`}
                title="Chapter Video"
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-6 lg:px-10">
            <div className="max-w-2xl mx-auto">
              <div className="mb-3 flex items-center gap-2 text-sm font-mono" style={{ color: '#ffb77f' }}>
                <span className="material-symbols-outlined text-[16px]">auto_stories</span>
                CHAPTER 1.2
              </div>
              <h1 className="font-body font-bold text-2xl text-text-main mb-2">Mitosis &amp; Meiosis</h1>
              <p className="text-muted text-sm font-body leading-relaxed mb-6">Understanding cell division, replication, and genetic distribution through engaging visual explanations.</p>

              {/* Drag-and-drop activity placeholder */}
              <div className="border-2 border-dashed border-border-structural rounded-lg p-6 mb-6 text-center hover:border-amber transition-colors" style={{ '--hover-color': '#ffb77f' }}>
                <span className="material-symbols-outlined text-muted text-[36px] mb-2 block">touch_app</span>
                <p className="label-caps text-muted text-[10px]">DRAG & DROP ACTIVITY</p>
                <p className="font-body text-sm text-muted mt-1">Match each phase of mitosis to its description</p>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {['Prophase', 'Metaphase', 'Anaphase', 'Telophase'].map(phase => (
                    <div key={phase} className="bg-surface border border-border-structural rounded p-3 text-sm font-body text-text-main cursor-grab hover:border-amber transition-colors" style={{ '--hover-color': '#ffb77f' }}>
                      {phase}
                    </div>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4 text-text-main font-body leading-relaxed text-base">
                <p>The cell cycle involves cell growth and division, producing two daughter cells through carefully regulated stages.</p>
                <div className="p-4 border rounded-lg flex gap-3 items-start" style={{ borderColor: '#ffb77f33', backgroundColor: 'rgba(255,183,127,0.05)' }}>
                  <span className="material-symbols-outlined mt-0.5" style={{ color: '#ffb77f', fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
                  <div>
                    <strong className="block text-text-main mb-1">Key Concept: PMAT</strong>
                    <p className="text-sm text-muted">Remember the phases with PMAT: Prophase → Metaphase → Anaphase → Telophase</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button onClick={() => navigate('/explorer/subjects')} className="explorer-btn-primary text-xs">
                  TAKE QUIZ
                </button>
                <button onClick={() => navigate('/explorer/subjects')} className="border border-border-structural text-muted font-mono text-xs px-4 py-2 hover:text-text-main transition-colors">
                  NEXT TOPIC
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* AI Buddy */}
        <aside className="w-[260px] flex-shrink-0 border-l border-border-structural bg-background flex flex-col">
          <div className="p-4 border-b border-border-structural bg-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]" style={{ color: '#88ceff', fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
            <span className="label-caps text-[10px]" style={{ color: '#88ceff' }}>STUDY BUDDY</span>
            <div className="ml-auto w-2 h-2 rounded-full bg-success animate-pulse" />
          </div>
          <div ref={chatRef} className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`${msg.role === 'user' ? 'flex justify-end' : ''}`}>
                <div className={`rounded-lg p-3 text-xs font-body leading-relaxed max-w-[95%] ${
                  msg.role === 'user'
                    ? 'bg-surface-hover border border-border-structural text-text-main'
                    : 'border border-border-structural bg-surface text-text-main'
                }`}
                  style={msg.role === 'assistant' ? { borderLeftColor: '#88ceff', borderLeftWidth: '2px' } : {}}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-border-structural bg-surface">
            <div className="flex gap-2">
              <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="Ask your buddy..."
                className="flex-1 bg-background border border-border-structural rounded px-3 py-2 text-xs text-text-main placeholder-muted focus:outline-none transition-all"
                style={{ '--tw-ring-color': '#88ceff' }}
              />
              <button onClick={send} className="w-8 h-8 rounded flex items-center justify-center" style={{ backgroundColor: '#88ceff' }}>
                <span className="material-symbols-outlined text-background text-[14px] -rotate-90">send</span>
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
