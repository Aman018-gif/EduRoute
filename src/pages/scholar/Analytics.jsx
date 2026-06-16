import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { weeklyActivity, heatmapData, conceptMastery } from '../../data/curriculum'
import CircularProgress from '../../components/shared/CircularProgress'

export default function Analytics() {
  const navigate = useNavigate()
  const maxMinutes = Math.max(...weeklyActivity.map(d => d.minutes))

  const heatColors = ['#15181F', '#FF8A0030', '#FF8A0060', '#FF8A00AA', '#FF8A00']

  return (
    <div className="flex flex-col min-h-screen">
      <header className="h-20 border-b border-border px-8 flex items-center justify-between flex-shrink-0 bg-background/95 sticky top-0 z-10">
        <div>
          <h2 className="font-heading text-2xl text-text-main">Learning Analytics</h2>
          <p className="text-muted text-sm mt-0.5 font-body">Track your performance and identify growth areas.</p>
        </div>
        <div className="flex gap-3">
          <button className="scholar-btn-ghost text-xs py-2">This Week</button>
          <button className="scholar-btn-ghost text-xs py-2">This Month</button>
        </div>
      </header>

      <div className="p-8 max-w-[1100px] w-full mx-auto space-y-8">
        {/* Summary stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Study Hours', value: '42h', sub: 'This month', icon: 'schedule', color: '#FF8A00' },
            { label: 'Avg. Accuracy', value: '83%', sub: 'Across all quizzes', icon: 'target', color: '#00C853' },
            { label: 'Chapters Done', value: '14', sub: '6 in progress', icon: 'auto_stories', color: '#88ceff' },
            { label: 'Current Streak', value: '12d', sub: 'Keep going!', icon: 'local_fire_department', color: '#FF3B30' },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="bg-surface border border-border rounded p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="material-symbols-outlined text-[20px]" style={{ color: stat.color }}>{stat.icon}</span>
                <span className="text-xs text-muted font-mono uppercase tracking-wider">{stat.sub}</span>
              </div>
              <p className="font-mono text-3xl font-semibold text-text-main mb-1">{stat.value}</p>
              <p className="text-muted text-xs font-body">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weekly Activity Bar Chart */}
          <div className="lg:col-span-2 bg-surface border border-border rounded p-6">
            <h4 className="font-mono text-xs text-muted uppercase tracking-wider mb-6">Weekly Study Activity</h4>
            <div className="flex items-end gap-3 h-[180px]">
              {weeklyActivity.map(d => (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-muted text-[10px] font-mono">{d.minutes}m</span>
                  <div className="w-full rounded-sm transition-all" style={{
                    height: `${(d.minutes / maxMinutes) * 140}px`,
                    backgroundColor: d.day === 'Wed' || d.day === 'Sat' ? '#FF8A00' : '#2C313D',
                    minHeight: '4px',
                  }} />
                  <span className="text-muted text-[11px] font-mono">{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Subject Mastery Radial */}
          <div className="bg-surface border border-border rounded p-6">
            <h4 className="font-mono text-xs text-muted uppercase tracking-wider mb-6">Subject Mastery</h4>
            <div className="space-y-4">
              {[
                { name: 'Biology', v: 72, color: '#00C853' },
                { name: 'Physics', v: 84, color: '#FF8A00' },
                { name: 'Chemistry', v: 72, color: '#88ceff' },
                { name: 'Math', v: 91, color: '#AA77FF' },
              ].map(s => (
                <div key={s.name} className="flex items-center gap-4">
                  <span className="text-text-main text-sm font-body w-20">{s.name}</span>
                  <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${s.v}%`, backgroundColor: s.color }} />
                  </div>
                  <span className="text-muted text-xs font-mono w-8 text-right">{s.v}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Heatmap */}
        <div className="bg-surface border border-border rounded p-6">
          <h4 className="font-mono text-xs text-muted uppercase tracking-wider mb-4">Study Heatmap — Last 12 Weeks</h4>
          <div className="flex flex-wrap gap-1">
            {heatmapData.map((cell, i) => (
              <div
                key={i}
                title={cell.intensity > 0 ? `${cell.intensity * 30}min` : 'No activity'}
                className="w-3 h-3 rounded-sm transition-colors cursor-pointer hover:opacity-80"
                style={{ backgroundColor: heatColors[cell.intensity] }}
              />
            ))}
          </div>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-muted text-xs font-mono">Less</span>
            {heatColors.map((c, i) => <div key={i} className="w-3 h-3 rounded-sm" style={{ backgroundColor: c }} />)}
            <span className="text-muted text-xs font-mono">More</span>
          </div>
        </div>

        {/* Concept Mastery */}
        <div className="bg-surface border border-border rounded p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-mono text-xs text-muted uppercase tracking-wider">Concept Mastery</h4>
            <span className="text-xs text-primary font-mono cursor-pointer hover:underline">Priority Remediation →</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {conceptMastery.sort((a, b) => a.mastery - b.mastery).map((c, i) => (
              <div key={c.concept}
                className={`flex items-center gap-4 p-4 rounded border transition-colors ${
                  c.mastery < 60 ? 'border-danger/30 bg-danger/5' : 'border-border'
                }`}
              >
                <CircularProgress value={c.mastery} size={48} color={c.mastery < 60 ? '#FF3B30' : '#00C853'} />
                <div>
                  <p className="text-text-main text-sm font-body font-medium">{c.concept}</p>
                  <p className="text-muted text-xs font-mono">{c.subject}</p>
                  {c.mastery < 60 && (
                    <button onClick={() => navigate('/scholar/exam-sprint')}
                      className="text-danger text-[11px] font-mono mt-1 hover:underline">
                      Needs Review →
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
