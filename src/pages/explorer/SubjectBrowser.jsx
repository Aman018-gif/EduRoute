import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { subjects } from '../../data/curriculum'

export default function ExplorerSubjectBrowser() {
  const navigate = useNavigate()
  const [activeSubject, setActiveSubject] = useState('science')
  const subjectList = Object.values(subjects)
  const current = subjects[activeSubject]

  return (
    <div className="flex flex-col min-h-screen">
      <header className="h-20 border-b border-border-structural px-8 flex items-center justify-between flex-shrink-0 bg-background/95 sticky top-0 z-10">
        <div>
          <h2 className="headline-md" style={{ fontFamily: 'Newsreader, serif', color: '#ffb77f' }}>Curriculum</h2>
          <p className="text-muted text-sm font-body">All subjects and chapters</p>
        </div>
      </header>

      {/* Subject tabs */}
      <div className="border-b border-border-structural flex gap-0 px-8">
        {subjectList.map(s => (
          <button key={s.id} onClick={() => setActiveSubject(s.id)}
            className="px-5 py-3 label-caps border-b-2 transition-colors"
            style={{
              borderBottomColor: activeSubject === s.id ? '#ffb77f' : 'transparent',
              color: activeSubject === s.id ? '#ffb77f' : '#8A919E',
            }}>
            {s.name}
          </button>
        ))}
      </div>

      <div className="p-8 max-w-[900px] mx-auto w-full">
        <div className="space-y-4">
          {current?.chapters.map((ch, i) => (
            <motion.div key={ch.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="bento-card group cursor-pointer"
              onClick={() => navigate('/explorer/learning-space')}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${current.color}20`, border: `2px solid ${current.color}` }}>
                  <span className="font-mono font-bold" style={{ color: current.color }}>{i + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="label-caps mb-1" style={{ color: current.color }}>{ch.unit}</p>
                  <h4 className="font-body font-semibold text-text-main">{ch.title}</h4>
                  <div className="flex gap-4 mt-1 text-xs text-muted font-mono">
                    <span>{ch.topics} topics</span>
                    <span>{ch.duration}</span>
                    <span>{ch.quizzes} quizzes</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-border-structural rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${ch.progress}%`, backgroundColor: current.color }} />
                    </div>
                    <span className="text-xs font-mono" style={{ color: current.color }}>{ch.progress}%</span>
                  </div>
                </div>
                <button className="explorer-btn-primary text-[10px] py-2 px-4">
                  {ch.progress > 0 ? 'CONTINUE' : 'START'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
