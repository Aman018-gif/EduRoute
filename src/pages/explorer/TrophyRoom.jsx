import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { achievements } from '../../data/curriculum'

export default function TrophyRoom() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')

  const earned = achievements.filter(a => a.earned)
  const locked = achievements.filter(a => !a.earned)
  const totalXP = earned.reduce((s, a) => s + a.xp, 0)

  const filtered = filter === 'earned' ? earned : filter === 'locked' ? locked : achievements

  return (
    <div className="flex flex-col min-h-screen">
      <header className="h-20 border-b border-border-structural px-8 flex items-center justify-between flex-shrink-0 bg-background/95 sticky top-0 z-10">
        <div>
          <h2 className="headline-md" style={{ fontFamily: 'Newsreader, serif', color: '#ffb77f' }}>Scholar Trophy Room</h2>
          <p className="text-muted text-sm font-body">Your achievements and explorer badges</p>
        </div>
      </header>

      <div className="p-8 max-w-[1000px] mx-auto w-full space-y-8">
        {/* Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total XP', value: `${totalXP.toLocaleString()}`, icon: 'bolt', color: '#ffb77f' },
            { label: 'Badges Earned', value: `${earned.length}/${achievements.length}`, icon: 'military_tech', color: '#00C853' },
            { label: 'Current Level', value: 'Lvl 14', icon: 'emoji_events', color: '#88ceff' },
            { label: 'Current Streak', value: '12 Days', icon: 'local_fire_department', color: '#FF3B30' },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="bento-card text-center">
              <span className="material-symbols-outlined text-[28px] mb-2" style={{ color: stat.color, fontVariationSettings: "'FILL' 1" }}>{stat.icon}</span>
              <p className="headline-md" style={{ fontFamily: 'Newsreader, serif', color: stat.color }}>{stat.value}</p>
              <p className="label-caps text-muted mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Level Progress */}
        <div className="bento-card">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="label-caps" style={{ color: '#ffb77f' }}>LEVEL 14 EXPLORER</span>
              <p className="font-body text-text-main mt-0.5">800 XP to reach Level 15 — Master Scout</p>
            </div>
            <div className="w-16 h-16 rounded-full flex items-center justify-center font-mono font-bold text-xl border-2" style={{ borderColor: '#ffb77f', color: '#ffb77f', backgroundColor: 'rgba(255,183,127,0.1)' }}>
              14
            </div>
          </div>
          <div className="h-2 w-full bg-border-structural rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all" style={{ width: '65%', backgroundColor: '#ffb77f' }} />
          </div>
          <div className="flex justify-between mt-2">
            <span className="label-caps text-muted">{totalXP} XP</span>
            <span className="label-caps text-muted">{totalXP + 800} XP</span>
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-2">
          {['all', 'earned', 'locked'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-4 py-1.5 label-caps border transition-all"
              style={{
                borderColor: filter === f ? '#ffb77f' : '#2C313D',
                backgroundColor: filter === f ? 'rgba(255,183,127,0.1)' : 'transparent',
                color: filter === f ? '#ffb77f' : '#8A919E',
              }}>
              {f.toUpperCase()} {f === 'earned' ? `(${earned.length})` : f === 'locked' ? `(${locked.length})` : `(${achievements.length})`}
            </button>
          ))}
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {filtered.map((badge, i) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
              className={`bento-card text-center transition-all ${!badge.earned ? 'opacity-40 grayscale' : ''}`}
              style={badge.earned ? { borderColor: `${badge.color}40` } : {}}
            >
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3"
                style={{ backgroundColor: `${badge.color}15`, border: `2px solid ${badge.color}` }}>
                <span className="material-symbols-outlined text-[28px]" style={{ color: badge.color, fontVariationSettings: "'FILL' 1" }}>
                  {badge.icon}
                </span>
              </div>
              <h4 className="font-body font-semibold text-text-main text-sm mb-1">{badge.title}</h4>
              <p className="text-muted text-xs font-body leading-snug mb-2">{badge.desc}</p>
              <span className="label-caps" style={{ color: badge.earned ? badge.color : '#8A919E' }}>+{badge.xp} XP</span>
              {badge.earned && (
                <div className="mt-2">
                  <span className="text-[10px] font-mono text-success bg-success/10 border border-success/30 px-2 py-0.5 rounded">EARNED</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
