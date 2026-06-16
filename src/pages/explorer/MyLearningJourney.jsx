import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { explorerUnits } from '../../data/curriculum'

export default function MyLearningJourney() {
  const navigate = useNavigate()
  const [selectedUnit, setSelectedUnit] = useState(explorerUnits[1]) // Active unit

  const svgWidth = 1000
  const svgHeight = 250

  // Zigzag path points for the 5 units
  const pathPoints = [
    [100, 160], [270, 80], [450, 160], [630, 80], [800, 140]
  ]

  const pathD = pathPoints.reduce((acc, [x, y], i) => {
    if (i === 0) return `M ${x} ${y}`
    const [px, py] = pathPoints[i - 1]
    const cpx = (px + x) / 2
    return `${acc} C ${cpx} ${py}, ${cpx} ${y}, ${x} ${y}`
  }, '')

  const completedD = `M ${pathPoints[0][0]} ${pathPoints[0][1]} C ${(pathPoints[0][0] + pathPoints[1][0]) / 2} ${pathPoints[0][1]}, ${(pathPoints[0][0] + pathPoints[1][0]) / 2} ${pathPoints[1][1]}, ${pathPoints[1][0]} ${pathPoints[1][1]}`

  return (
    <div className="flex flex-col h-screen">
      <header className="h-16 border-b border-border-structural flex items-center justify-between px-8 bg-background flex-shrink-0">
        <div className="flex items-center gap-3">
          <span className="headline-md" style={{ fontFamily: 'Newsreader, serif', color: '#ffb77f' }}>My Learning Journey</span>
          <div className="h-4 w-px bg-border-structural" />
          <span className="label-caps text-muted">MY LEARNING SPACE</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-surface border border-border-structural rounded-full">
            <span className="material-symbols-outlined text-sm" style={{ color: '#ffb77f', fontVariationSettings: "'FILL' 1" }}>bolt</span>
            <span className="label-caps" style={{ color: '#ffb77f' }}>SPRINT MODE</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Map Canvas */}
        <section className="flex-1 relative overflow-auto bg-background dot-grid-bg">
          <div className="min-w-[1100px] min-h-[500px] flex items-center justify-center p-16 relative">

            {/* SVG journey path */}
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="absolute"
              style={{ width: '100%', maxWidth: 1000, top: '50%', transform: 'translateY(-50%)' }}
            >
              {/* Dashed background path */}
              <path d={pathD} fill="none" stroke="#2C313D" strokeWidth="4" strokeDasharray="8 12" />
              {/* Completed glow path */}
              <path d={completedD} fill="none" stroke="#ffb77f" strokeWidth="4" strokeOpacity="0.6" />
            </svg>

            {/* Milestone Nodes */}
            <div className="relative flex justify-around items-center w-full" style={{ maxWidth: 1000 }}>
              {explorerUnits.map((unit, i) => {
                const isActive = unit.status === 'active'
                const isDone = unit.status === 'completed'
                const isLocked = unit.status === 'locked'
                const color = isDone ? '#ffb77f' : isActive ? '#ffb77f' : '#2C313D'
                const offsetY = [0, -40, 0, -30, 10][i] ?? 0

                return (
                  <div
                    key={unit.id}
                    className="flex flex-col items-center gap-4 group cursor-pointer"
                    style={{
                      marginTop: offsetY > 0 ? `${offsetY}px` : 0,
                      marginBottom: offsetY < 0 ? `${-offsetY}px` : 0,
                      opacity: isLocked ? 0.4 : 1,
                    }}
                    onClick={() => !isLocked && setSelectedUnit(unit)}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: i * 0.1 }}
                      className={`rounded-full flex items-center justify-center relative transition-all ${
                        isActive ? 'hover:scale-110 active:scale-95' : isDone ? 'hover:scale-105' : 'cursor-not-allowed'
                      }`}
                      style={{
                        width: isActive ? 96 : 80,
                        height: isActive ? 96 : 80,
                        border: `2px solid ${color}`,
                        backgroundColor: `${color}15`,
                        boxShadow: (isDone || isActive) ? `0 0 20px ${color}50` : 'none',
                      }}
                    >
                      {isActive && (
                        <div className="absolute -top-10 px-2 py-1 rounded text-background text-[10px] font-mono font-bold animate-bounce" style={{ backgroundColor: '#ffb77f' }}>
                          ACTIVE
                        </div>
                      )}
                      {isLocked && (
                        <span className="material-symbols-outlined text-muted text-[24px]">lock</span>
                      )}
                      {!isLocked && (
                        <span className="material-symbols-outlined text-[28px]" style={{ color, fontVariationSettings: isDone ? "'FILL' 1" : "'FILL' 0" }}>
                          {isDone ? 'check_circle' : unit.icon}
                        </span>
                      )}
                    </motion.div>
                    <div className="text-center">
                      <p className="label-caps mb-1" style={{ color: isLocked ? '#8A919E' : '#ffb77f' }}>UNIT {String(unit.id).padStart(2, '0')}</p>
                      <p className="font-body font-semibold text-sm text-text-main">{unit.title}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Side Panel */}
        <aside className="w-[300px] flex-shrink-0 border-l border-border-structural bg-surface flex flex-col p-5">
          {selectedUnit && (
            <div className="space-y-4">
              <div>
                <span className="label-caps text-muted">CURRENT MISSION</span>
                <h2 className="headline-md mt-1 text-text-main" style={{ fontFamily: 'Newsreader, serif' }}>
                  {selectedUnit.title}
                </h2>
              </div>

              <div className="p-4 bg-background border border-border-structural rounded relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-10">
                  <span className="material-symbols-outlined text-[60px]">target</span>
                </div>
                <p className="label-caps text-muted mb-2">PROGRESS</p>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-body text-text-main text-sm">{selectedUnit.mastery}% Complete</span>
                  <span className="label-caps" style={{ color: '#ffb77f' }}>+{selectedUnit.xp} XP</span>
                </div>
                <div className="w-full h-1.5 bg-border-structural rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${selectedUnit.mastery}%`, backgroundColor: '#ffb77f' }} />
                </div>
                <button
                  onClick={() => navigate('/explorer/learning-space')}
                  className="w-full mt-4 explorer-btn-primary"
                >
                  {selectedUnit.status === 'completed' ? 'REVIEW UNIT' : selectedUnit.status === 'active' ? 'RESUME SPRINT' : 'LOCKED'}
                </button>
              </div>

              {/* Fun Fact */}
              <div className="p-4 bg-surface border border-border-structural hover:border-amber transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-sm" style={{ color: '#ffb77f', fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
                  <span className="label-caps" style={{ color: '#ffb77f' }}>FUN FACT</span>
                </div>
                <p className="font-body text-sm text-muted italic">
                  "Deep sea hydrothermal vents support life without sunlight using chemosynthesis — the basis of studying life on other planets!"
                </p>
              </div>

              {/* AI Companion */}
              <div className="mt-auto pt-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined" style={{ color: '#88ceff' }}>smart_toy</span>
                    <span className="label-caps" style={{ color: '#88ceff' }}>AI COMPANION</span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                </div>
                <div className="p-3 border border-border-structural rounded text-sm italic text-muted font-body">
                  "You're doing great! Complete Unit 02 to unlock Unit 03 — Cognitive Bias. You're 450 XP away from your next badge!"
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}
