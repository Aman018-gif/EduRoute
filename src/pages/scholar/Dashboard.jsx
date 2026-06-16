import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useUser } from '../../context/UserContext'
import CircularProgress from '../../components/shared/CircularProgress'
import { subjects } from '../../data/curriculum'

const subjectProgress = [
  { name: 'Physics', sub: 'Mechanics', progress: 84, color: '#FF8A00' },
  { name: 'Chemistry', sub: 'Organic', progress: 72, color: '#88ceff' },
  { name: 'Biology', sub: 'Genetics', progress: 91, color: '#00C853' },
]

const launchpad = [
  { to: '/scholar/study-hub', icon: 'menu_book', title: 'Study Hub', desc: 'Enter deep focus. Text, video, and AI synced.' },
  { to: '/scholar/exam-sprint', icon: 'timer', title: 'Exam Sprint', desc: 'High-intensity active recall and flashcards.' },
  { to: '/scholar/revision', icon: 'account_tree', title: 'Revision Mode', desc: 'Visual concept maps and knowledge graphs.' },
]

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: i => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.4 } })
}

export default function ScholarDashboard() {
  const { user } = useUser()
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="h-20 border-b border-border px-8 flex items-center justify-between flex-shrink-0 bg-background/95 backdrop-blur-sm sticky top-0 z-10">
        <div>
          <h2 className="font-heading text-2xl tracking-tight text-text-main">Dashboard</h2>
          <p className="text-muted text-sm mt-0.5 font-body">Command center for academic mastery.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-muted hover:text-text-main transition-colors border border-border rounded hover:bg-surface" title="Notifications">
            <span className="material-symbols-outlined text-[20px]">notifications</span>
          </button>
          <button
            onClick={() => navigate('/scholar/exam-sprint')}
            className="scholar-btn-primary hidden sm:flex"
          >
            <span className="material-symbols-outlined text-[16px]">bolt</span>
            Quick Sprint
          </button>
        </div>
      </header>

      <div className="p-8 max-w-[1200px] w-full mx-auto flex flex-col gap-8">
        {/* Current Objective */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="group relative"
        >
          <div className="absolute -inset-[1px] bg-border group-hover:bg-primary transition-colors duration-500 rounded" />
          <div className="relative bg-surface rounded p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex-1">
              <p className="text-primary font-mono text-xs uppercase tracking-widest mb-2 font-semibold">Current Objective</p>
              <h3 className="font-heading text-3xl sm:text-4xl mb-3 text-text-main">Cell Structure &amp; Functions</h3>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">play_circle</span>
                  45m remaining
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">description</span>
                  12 notes taken
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">quiz</span>
                  3 quizzes left
                </span>
              </div>
            </div>
            <button
              onClick={() => navigate('/scholar/study-hub')}
              className="scholar-btn-primary py-3 px-8 flex-shrink-0 w-full sm:w-auto justify-center"
            >
              Resume Chapter
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </motion.section>

        {/* Progress */}
        <section>
          <h4 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">Mastery Progress</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {subjectProgress.map((s, i) => (
              <motion.div
                key={s.name}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                className="bg-surface border border-border p-6 rounded flex items-center justify-between hover:border-primary/40 transition-colors"
              >
                <div>
                  <p className="font-medium mb-1 font-body text-text-main">{s.name}</p>
                  <p className="text-muted text-sm font-body">{s.sub}</p>
                </div>
                <CircularProgress value={s.progress} size={60} color={s.color} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Recent Subjects */}
        <section>
          <h4 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">Subject Overview</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.values(subjects).map((subj, i) => (
              <motion.button
                key={subj.id}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                onClick={() => navigate('/scholar/subjects')}
                className="bg-surface border border-border p-5 rounded flex flex-col items-start text-left hover:border-primary/40 hover:bg-surface-hover transition-all group"
              >
                <div className="w-9 h-9 rounded border border-border flex items-center justify-center mb-3 group-hover:border-primary/40 transition-colors">
                  <span className="material-symbols-outlined text-[20px]" style={{ color: subj.color }}>{subj.icon}</span>
                </div>
                <h5 className="font-body font-semibold text-sm text-text-main mb-1">{subj.name}</h5>
                <p className="text-muted text-xs font-mono mb-3">{subj.chapters.length} chapters</p>
                <div className="w-full">
                  <div className="flex justify-between text-xs font-mono text-muted mb-1">
                    <span>Progress</span>
                    <span>{subj.chapters[0]?.progress ?? 0}%</span>
                  </div>
                  <div className="h-1 w-full bg-border rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${subj.chapters[0]?.progress ?? 0}%`, backgroundColor: subj.color }} />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Launchpad */}
        <section>
          <h4 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">Launchpad</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {launchpad.map((item, i) => (
              <motion.button
                key={item.to}
                custom={i + 4}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                onClick={() => navigate(item.to)}
                className="bg-surface border border-border hover:bg-surface-hover hover:border-primary/50 transition-all duration-200 p-6 rounded flex flex-col items-start text-left group"
              >
                <div className="w-10 h-10 rounded bg-background border border-border flex items-center justify-center mb-4 group-hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                </div>
                <h5 className="font-heading text-xl mb-2 text-text-main">{item.title}</h5>
                <p className="text-sm text-muted font-body leading-relaxed">{item.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-xs font-mono text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Launch <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        {/* AI Tip */}
        <section>
          <div className="bg-surface border border-border rounded p-5 flex items-start gap-4">
            <div className="w-9 h-9 rounded bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-primary text-[20px]">smart_toy</span>
            </div>
            <div>
              <p className="text-xs font-mono text-primary uppercase tracking-wider mb-1">AI Recommendation</p>
              <p className="text-sm text-text-main font-body leading-relaxed">
                Based on your performance, <strong className="text-white">Genetics</strong> and <strong className="text-white">Thermodynamics</strong> need attention. Consider a 30-minute Exam Sprint session before your next Biology chapter.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
