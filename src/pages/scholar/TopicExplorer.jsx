import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { subjects } from '../../data/curriculum'

const chapter = subjects.science.chapters[0]

export default function TopicExplorer() {
  const navigate = useNavigate()
  const [expandedTopic, setExpandedTopic] = useState(2)

  const topicDetails = [
    { duration: '35m', quizzes: 1, difficulty: 'Foundation' },
    { duration: '50m', quizzes: 2, difficulty: 'Intermediate' },
    { duration: '65m', quizzes: 3, difficulty: 'Advanced' },
    { duration: '45m', quizzes: 2, difficulty: 'Intermediate' },
    { duration: '40m', quizzes: 1, difficulty: 'Foundation' },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <header className="h-20 border-b border-border px-8 flex items-center justify-between flex-shrink-0 bg-background/95 sticky top-0 z-10">
        <div>
          <button onClick={() => navigate('/scholar/study-hub')} className="flex items-center gap-2 text-muted hover:text-text-main text-xs font-mono uppercase tracking-wider mb-1">
            <span className="material-symbols-outlined text-[14px]">arrow_back</span>
            Study Hub
          </button>
          <h2 className="font-heading text-2xl text-text-main">Topic Explorer</h2>
        </div>
        <div className="text-right">
          <p className="text-primary font-mono text-xs uppercase tracking-widest">Cell Structure &amp; Functions</p>
          <p className="text-muted text-sm font-body">5 topics · 4h 20m total</p>
        </div>
      </header>

      <div className="p-8 max-w-[900px] w-full mx-auto">
        {/* Chapter Overview */}
        <div className="bg-surface border border-border rounded p-6 mb-8 flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center flex-shrink-0">
            <span className="font-mono text-primary text-xl font-bold">65%</span>
          </div>
          <div className="flex-1">
            <h3 className="font-heading text-2xl text-text-main mb-1">Cell Structure &amp; Functions</h3>
            <div className="flex flex-wrap gap-4 text-sm text-muted">
              <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px]">schedule</span>4h 20m</span>
              <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px]">quiz</span>3 quizzes</span>
              <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px]">layers</span>5 topics</span>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-xs font-mono text-muted mb-1"><span>Overall Progress</span><span>65%</span></div>
              <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '65%' }} />
              </div>
            </div>
          </div>
          <button onClick={() => navigate('/scholar/study-hub')} className="scholar-btn-primary flex-shrink-0">
            <span className="material-symbols-outlined text-[16px]">play_arrow</span>
            Continue
          </button>
        </div>

        {/* Topics List */}
        <div className="space-y-3">
          {chapter.subtopics.map((topic, i) => {
            const detail = topicDetails[i] || {}
            const isActive = i === expandedTopic
            const statusColor = topic.done ? '#00C853' : isActive ? '#FF8A00' : '#8A919E'

            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className={`bg-surface border rounded overflow-hidden transition-colors ${
                  isActive ? 'border-primary' : 'border-border hover:border-primary/30'
                }`}
              >
                <button
                  onClick={() => setExpandedTopic(isActive ? -1 : i)}
                  className="w-full flex items-center gap-4 p-5 text-left"
                >
                  {/* Status indicator */}
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 font-mono text-sm font-semibold"
                    style={{ backgroundColor: `${statusColor}15`, border: `2px solid ${statusColor}`, color: statusColor }}
                  >
                    {topic.done ? '✓' : topic.num}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-body font-semibold text-text-main">{topic.title}</h4>
                      {topic.active && (
                        <span className="text-[10px] font-mono text-primary bg-primary/10 border border-primary/30 px-2 py-0.5 rounded">
                          Active
                        </span>
                      )}
                    </div>
                    <div className="flex gap-4 mt-1 text-xs text-muted font-mono">
                      <span>{detail.duration}</span>
                      <span>{detail.quizzes} quiz{detail.quizzes !== 1 ? 'zes' : ''}</span>
                      <span>{detail.difficulty}</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-muted text-[20px] transition-transform" style={{ transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    expand_more
                  </span>
                </button>

                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="px-5 pb-5 border-t border-border"
                  >
                    <p className="text-muted text-sm font-body leading-relaxed mt-4 mb-4">
                      In this topic, you will learn about the fundamental aspects of {topic.title.toLowerCase()} and its significance in understanding biological processes at the cellular level.
                    </p>
                    <div className="flex gap-3">
                      <button onClick={() => navigate('/scholar/study-hub')} className="scholar-btn-primary py-2 px-5 text-xs">
                        <span className="material-symbols-outlined text-[14px]">play_arrow</span>
                        {topic.done ? 'Review Topic' : 'Start Topic'}
                      </button>
                      <button onClick={() => navigate('/scholar/exam-sprint')} className="scholar-btn-ghost text-xs py-2 px-4">
                        <span className="material-symbols-outlined text-[14px]">quiz</span>
                        Quick Quiz
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Chapter Completion CTA */}
        <div className="mt-8 p-6 bg-surface border border-border rounded flex items-center justify-between">
          <div>
            <p className="text-muted text-xs font-mono uppercase tracking-wider mb-1">Chapter Milestone</p>
            <h4 className="font-heading text-xl text-text-main">Complete all topics to unlock chapter review</h4>
          </div>
          <div className="text-right">
            <span className="font-mono text-3xl font-bold text-primary">65%</span>
            <p className="text-muted text-xs font-mono">completed</p>
          </div>
        </div>
      </div>
    </div>
  )
}
