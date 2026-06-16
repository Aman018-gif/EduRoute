import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { subjects } from '../../data/curriculum'

export default function SubjectBrowser() {
  const navigate = useNavigate()
  const [activeSubject, setActiveSubject] = useState('science')
  const subjectList = Object.values(subjects)
  const currentSubject = subjects[activeSubject]

  return (
    <div className="flex flex-col min-h-screen">
      <header className="h-20 border-b border-border px-8 flex items-center justify-between flex-shrink-0 bg-background/95 sticky top-0 z-10">
        <div>
          <h2 className="font-heading text-2xl text-text-main">Subject &amp; Chapter Browser</h2>
          <p className="text-muted text-sm mt-0.5 font-body">Navigate your full curriculum.</p>
        </div>
        <input
          placeholder="Search chapters..."
          className="scholar-input w-64 hidden sm:block"
        />
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Subject tabs (left) */}
        <aside className="w-[180px] flex-shrink-0 border-r border-border bg-background p-3 space-y-1">
          {subjectList.map(subj => (
            <button
              key={subj.id}
              onClick={() => setActiveSubject(subj.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded text-sm font-body text-left transition-all ${
                activeSubject === subj.id ? 'bg-surface-hover text-text-main' : 'text-muted hover:bg-surface hover:text-text-main'
              }`}
              style={activeSubject === subj.id ? { borderLeft: `2px solid ${subj.color}` } : { borderLeft: '2px solid transparent' }}
            >
              <span className="material-symbols-outlined text-[18px]" style={{ color: subj.color }}>{subj.icon}</span>
              <span className="font-medium">{subj.name}</span>
            </button>
          ))}
        </aside>

        {/* Chapters */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[900px] mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded border border-border flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]" style={{ color: currentSubject?.color }}>{currentSubject?.icon}</span>
              </div>
              <div>
                <h3 className="font-heading text-2xl text-text-main">{currentSubject?.name}</h3>
                <p className="text-muted text-xs font-mono">{currentSubject?.chapters.length} chapters</p>
              </div>
            </div>

            <div className="grid gap-4">
              {currentSubject?.chapters.map((ch, i) => (
                <motion.div
                  key={ch.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-surface border border-border rounded p-6 hover:border-primary/40 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-muted text-xs font-mono uppercase tracking-wider">{ch.unit}</span>
                        {ch.progress > 80 && (
                          <span className="text-[10px] font-mono text-success bg-success/10 border border-success/30 px-1.5 py-0.5 rounded">
                            HIGH MASTERY
                          </span>
                        )}
                      </div>
                      <h4 className="font-body font-semibold text-lg text-text-main mb-2">{ch.title}</h4>
                      <div className="flex flex-wrap gap-4 text-xs text-muted font-mono">
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">topic</span>{ch.topics} topics</span>
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">quiz</span>{ch.quizzes} quizzes</span>
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">schedule</span>{ch.duration}</span>
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-between text-xs font-mono text-muted mb-1">
                          <span>Mastery</span><span>{ch.mastery}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all" style={{ width: `${ch.mastery}%`, backgroundColor: currentSubject.color }} />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <button onClick={() => navigate('/scholar/study-hub')} className="scholar-btn-primary py-2 px-5 text-xs">
                        {ch.progress > 0 ? 'Continue' : 'Start'}
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </button>
                      <button onClick={() => navigate('/scholar/topic-explorer')} className="scholar-btn-ghost text-xs py-2 px-3">
                        Topics
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
