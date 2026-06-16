import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { pyqs, flashcards } from '../../data/curriculum'

const examDate = new Date('2025-03-15')
const today = new Date()
const daysLeft = Math.ceil((examDate - today) / (1000 * 60 * 60 * 24))

export default function ExamMode() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('pyqs')
  const tabs = ['pyqs', 'revision', 'schedule', 'performance']

  return (
    <div className="flex flex-col min-h-screen">
      <header className="h-20 border-b border-border px-8 flex items-center justify-between flex-shrink-0 bg-background/95 sticky top-0 z-10">
        <div>
          <h2 className="font-heading text-2xl text-text-main">Exam Mode — Mastery Hub</h2>
          <p className="text-muted text-sm mt-0.5 font-body">Class 12 · Board Examination Preparation</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center border border-border rounded px-5 py-2 bg-surface">
            <p className="font-mono text-2xl font-bold text-primary">{Math.abs(daysLeft)}</p>
            <p className="text-muted text-[10px] font-mono uppercase tracking-wider">Days to Exam</p>
          </div>
          <button onClick={() => navigate('/scholar/exam-sprint')} className="scholar-btn-primary">
            <span className="material-symbols-outlined text-[16px]">bolt</span>
            Sprint Now
          </button>
        </div>
      </header>

      {/* Tab bar */}
      <div className="border-b border-border px-8 flex gap-0">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-5 py-3 text-xs font-mono uppercase tracking-wider transition-colors border-b-2 ${
              activeTab === tab ? 'text-primary border-primary' : 'text-muted border-transparent hover:text-text-main'
            }`}
          >
            {tab === 'pyqs' ? 'PYQ Bank' : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-[1000px] mx-auto">
          {activeTab === 'pyqs' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-xl text-text-main">Previous Year Questions</h3>
                <div className="flex gap-2">
                  {['All', 'Physics', 'Chemistry', 'Biology', 'Math'].map(f => (
                    <button key={f} className="scholar-btn-ghost text-xs py-1.5 px-3">{f}</button>
                  ))}
                </div>
              </div>
              {pyqs.map((q, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                  className="bg-surface border border-border rounded p-6 hover:border-primary/40 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-mono text-muted border border-border px-2 py-0.5 rounded">{q.year}</span>
                        <span className="text-xs font-mono text-primary bg-primary/10 border border-primary/30 px-2 py-0.5 rounded">{q.subject}</span>
                        <span className={`text-xs font-mono px-2 py-0.5 rounded border ${
                          q.frequency === 'Very High' ? 'text-danger bg-danger/10 border-danger/30' :
                          q.frequency === 'High' ? 'text-amber bg-amber/10 border-amber/30' :
                          'text-muted border-border'
                        }`}>
                          {q.frequency} freq
                        </span>
                      </div>
                      <p className="font-body text-text-main leading-relaxed">{q.question}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-mono text-xl font-bold text-text-main">{q.marks}</p>
                      <p className="text-muted text-[10px] font-mono">marks</p>
                      <button className="mt-3 scholar-btn-ghost text-xs py-1.5 px-3">Practice</button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'revision' && (
            <div className="grid grid-cols-2 gap-4">
              {flashcards.slice(0, 6).map((card, i) => (
                <div key={card.id} className="bg-surface border border-border rounded p-5 hover:border-primary/40 transition-colors">
                  <span className="text-xs font-mono text-primary">{card.subject} · {card.chapter}</span>
                  <p className="font-body text-text-main mt-2 mb-3">{card.question}</p>
                  <div className="h-px bg-border mb-3" />
                  <p className="text-muted text-sm font-body">{card.answer.slice(0, 80)}…</p>
                  <button onClick={() => navigate('/scholar/exam-sprint')} className="mt-3 text-xs font-mono text-primary hover:underline flex items-center gap-1">
                    Sprint this card <span className="material-symbols-outlined text-[12px]">arrow_forward</span>
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="space-y-4">
              <h3 className="font-heading text-xl text-text-main">Exam Schedule</h3>
              {[
                { date: 'Mar 15', day: 'Saturday', subject: 'Physics', time: '10:30 AM', code: '042' },
                { date: 'Mar 19', day: 'Wednesday', subject: 'Chemistry', time: '10:30 AM', code: '043' },
                { date: 'Mar 22', day: 'Saturday', subject: 'Mathematics', time: '10:30 AM', code: '041' },
                { date: 'Mar 25', day: 'Tuesday', subject: 'Biology', time: '10:30 AM', code: '044' },
              ].map((exam, i) => (
                <div key={i} className={`bg-surface border rounded p-5 flex items-center gap-5 ${i === 0 ? 'border-primary' : 'border-border'}`}>
                  {i === 0 && <div className="absolute -inset-px rounded border border-primary" />}
                  <div className="text-center w-16 flex-shrink-0 border-r border-border pr-5">
                    <p className="font-mono text-xl font-bold text-primary">{exam.date.split(' ')[1]}</p>
                    <p className="text-muted text-xs font-mono">{exam.date.split(' ')[0]}</p>
                  </div>
                  <div className="flex-1">
                    <p className="font-body font-semibold text-text-main">{exam.subject}</p>
                    <p className="text-muted text-xs font-mono">{exam.day} · {exam.time} · Code {exam.code}</p>
                  </div>
                  {i === 0 && <span className="text-xs font-mono text-primary bg-primary/10 border border-primary/30 px-3 py-1 rounded">NEXT</span>}
                  <button onClick={() => navigate('/scholar/exam-sprint')} className="scholar-btn-primary text-xs py-2 px-4">Prepare</button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {['Physics', 'Chemistry', 'Biology', 'Mathematics'].map((subj, i) => {
                const score = [84, 72, 91, 88][i]
                const attempts = [12, 9, 15, 11][i]
                return (
                  <div key={subj} className="bg-surface border border-border rounded p-6">
                    <h4 className="font-heading text-xl text-text-main mb-1">{subj}</h4>
                    <p className="text-muted text-xs font-mono mb-4">{attempts} mock tests · Last 30 days</p>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-center">
                        <p className="font-mono text-3xl font-bold text-primary">{score}%</p>
                        <p className="text-muted text-[10px] font-mono">avg score</p>
                      </div>
                      <div className="flex-1 space-y-2">
                        {['Excellent (>85%)', 'Good (70-85%)', 'Needs Work (<70%)'].map((label, j) => {
                          const vals = [65, 25, 10]
                          return (
                            <div key={label} className="flex items-center gap-2">
                              <span className="text-[10px] text-muted font-mono w-28">{label}</span>
                              <div className="flex-1 h-1 bg-border rounded-full overflow-hidden">
                                <div className="h-full rounded-full" style={{ width: `${vals[j]}%`, backgroundColor: ['#00C853', '#FF8A00', '#FF3B30'][j] }} />
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
