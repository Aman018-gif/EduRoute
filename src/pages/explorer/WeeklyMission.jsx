import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { weeklyMissions } from '../../data/curriculum'

const dayLetters = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const studiedDays = [0, 1, 2]

export default function WeeklyMission() {
  const navigate = useNavigate()
  const totalXP = 1250
  const earnedXP = 850
  const accuracy = 85
  const completedMissions = weeklyMissions.filter(m => m.done).length

  return (
    <div className="flex flex-col min-h-screen">
      <header className="h-20 border-b border-border-structural px-8 flex items-center justify-between flex-shrink-0 bg-background/95 sticky top-0 z-10">
        <div>
          <h2 className="headline-md" style={{ fontFamily: 'Newsreader, serif', color: '#ffb77f' }}>Weekly Mission Report</h2>
          <p className="text-muted text-sm font-body">Week of June 9 – June 15, 2026</p>
        </div>
        <div className="text-right">
          <p className="label-caps" style={{ color: '#ffb77f' }}>{completedMissions}/{weeklyMissions.length} MISSIONS DONE</p>
          <p className="text-muted text-xs font-mono mt-0.5">{earnedXP} / {totalXP} XP earned</p>
        </div>
      </header>

      <div className="p-8 max-w-[900px] mx-auto w-full space-y-8">
        {/* Week at a glance */}
        <div className="bento-card">
          <h3 className="label-caps mb-5" style={{ color: '#ffb77f' }}>WEEK AT A GLANCE</h3>
          <div className="flex flex-col sm:flex-row gap-8 items-center">
            <div className="flex gap-3">
              {dayLetters.map((d, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 flex items-center justify-center font-mono font-bold text-sm border-2 transition-colors"
                    style={{
                      borderColor: studiedDays.includes(i) ? '#ffb77f' : '#2C313D',
                      backgroundColor: studiedDays.includes(i) ? 'rgba(255,183,127,0.15)' : 'transparent',
                      color: studiedDays.includes(i) ? '#ffb77f' : '#8A919E',
                    }}>
                    {d}
                  </div>
                  {studiedDays.includes(i) && (
                    <span className="material-symbols-outlined text-[12px]" style={{ color: '#00C853', fontVariationSettings: "'FILL' 1" }}>check</span>
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-10 text-center">
              <div>
                <p className="display-lg leading-none" style={{ fontFamily: 'Newsreader, serif', color: '#ffb77f' }}>{earnedXP}</p>
                <p className="label-caps text-muted mt-1">XP EARNED</p>
              </div>
              <div className="w-px h-12 bg-border-structural" />
              <div>
                <p className="display-lg leading-none" style={{ fontFamily: 'Newsreader, serif', color: '#00C853' }}>{accuracy}%</p>
                <p className="label-caps text-muted mt-1">ACCURACY</p>
              </div>
              <div className="w-px h-12 bg-border-structural" />
              <div>
                <p className="display-lg leading-none" style={{ fontFamily: 'Newsreader, serif', color: '#88ceff' }}>12</p>
                <p className="label-caps text-muted mt-1">DAY STREAK</p>
              </div>
            </div>
          </div>
        </div>

        {/* Missions */}
        <div>
          <h3 className="label-caps text-muted mb-4">THIS WEEK'S MISSIONS</h3>
          <div className="space-y-3">
            {weeklyMissions.map((mission, i) => {
              const pct = Math.min((mission.progress / mission.total) * 100, 100)
              return (
                <motion.div key={mission.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                  className={`bento-card transition-colors ${mission.done ? 'border-success/30' : ''}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: mission.done ? 'rgba(0,200,83,0.15)' : 'rgba(255,183,127,0.1)', border: `2px solid ${mission.done ? '#00C853' : '#ffb77f'}` }}>
                        <span className="material-symbols-outlined text-[18px]" style={{ color: mission.done ? '#00C853' : '#ffb77f', fontVariationSettings: "'FILL' 1" }}>
                          {mission.done ? 'check_circle' : 'flag'}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-body text-text-main font-medium">{mission.title}</p>
                        <div className="mt-2">
                          <div className="flex justify-between text-xs font-mono text-muted mb-1">
                            <span>{mission.progress}/{mission.total}</span>
                            <span style={{ color: mission.done ? '#00C853' : '#ffb77f' }}>+{mission.xp} XP</span>
                          </div>
                          <div className="h-1.5 w-full bg-border-structural rounded-full overflow-hidden">
                            <div className="h-full rounded-full transition-all"
                              style={{ width: `${pct}%`, backgroundColor: mission.done ? '#00C853' : '#ffb77f' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                    {mission.done && (
                      <span className="text-[10px] font-mono text-success bg-success/10 border border-success/30 px-2 py-1 rounded whitespace-nowrap">COMPLETE</span>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Next Week Preview */}
        <div className="bento-card">
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined" style={{ color: '#88ceff' }}>mystery</span>
            <h3 className="label-caps" style={{ color: '#88ceff' }}>NEXT WEEK PREVIEW</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {['Neural Connectivity Basics', 'Atmospheric Physics Intro', 'Weekly Challenge: Speed Sprint'].map((item, i) => (
              <div key={item} className="p-3 bg-background border border-border-structural rounded">
                <div className="w-8 h-8 rounded-full mb-2 flex items-center justify-center" style={{ backgroundColor: 'rgba(136,206,255,0.1)', border: '1px solid #88ceff33' }}>
                  <span className="text-xs font-mono font-bold" style={{ color: '#88ceff' }}>{i + 1}</span>
                </div>
                <p className="font-body text-sm text-text-main">{item}</p>
                {i === 2 && <p className="text-muted text-xs font-mono mt-1">MYSTERY REWARD</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
