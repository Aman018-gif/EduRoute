import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useUser } from '../../context/UserContext'
import { weeklyMissions } from '../../data/curriculum'

const discoveryCards = [
  { subject: 'Astrophysics', title: 'Stellar Life Cycles', icon: 'stars', color: '#AA77FF' },
  { subject: 'Engineering', title: 'Robotics & Logic Gates', icon: 'precision_manufacturing', color: '#88ceff' },
  { subject: 'Chemistry', title: 'Molecular Bonding', icon: 'science', color: '#00C853' },
  { subject: 'History', title: 'Ancient Civilizations', icon: 'history_edu', color: '#ffb77f' },
]

const dayLetters = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const studiedDays = [0, 1, 2] // Mon, Tue, Wed studied

export default function ExplorerDashboard() {
  const navigate = useNavigate()
  const { user } = useUser()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Header */}
      <header className="h-16 border-b border-border-structural flex items-center justify-between px-8 bg-background/80 backdrop-blur-sm sticky top-0 z-10 flex-shrink-0">
        <div>
          <h2 className="headline-md" style={{ fontFamily: 'Newsreader, serif', color: '#ffb77f' }}>Mission Control</h2>
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate('/explorer/journey')}
            className="px-4 py-1.5 border text-xs font-mono uppercase tracking-widest hover:opacity-80 transition-all"
            style={{ borderColor: '#ffb77f', color: '#ffb77f' }}
          >
            Sprint Mode
          </button>
          <div className="flex items-center gap-3 text-muted">
            <span className="material-symbols-outlined cursor-pointer hover:text-amber transition-colors" style={{ '--tw-text-opacity': 1 }}>notifications</span>
            <span className="material-symbols-outlined cursor-pointer hover:text-amber transition-colors">account_circle</span>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-8">
        {/* Welcome */}
        <div className="mb-8">
          <h2 className="display-lg mb-2" style={{ fontFamily: 'Newsreader, serif', color: '#E2E4E9' }}>
            Welcome back, {user?.name?.split(' ')[0] ?? 'Scholar'}.
          </h2>
          <p className="text-muted font-body max-w-xl">Your current mission: Complete the "Oceanic Ecosystems" module. You are 84% through your weekly mastery target.</p>
        </div>

        {/* Hero Bento + Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
          {/* Hero Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-8 bento-card relative overflow-hidden group cursor-pointer"
            onClick={() => navigate('/explorer/learning-space')}
          >
            <div className="absolute top-0 right-0 p-5">
              <span className="label-caps px-3 py-1 rounded-full text-background" style={{ backgroundColor: '#ffb77f' }}>PRIORITY ONE</span>
            </div>
            <div className="relative z-10 max-w-lg">
              <h3 className="display-lg mb-4" style={{ fontFamily: 'Newsreader, serif', color: '#ffb77f' }}>Deep Sea Hydrothermal Vents</h3>
              <p className="text-muted mb-8 font-body leading-relaxed">Explore the chemical-rich environments of the abyssal plain. This module requires advanced visualization tools for mastery.</p>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex -space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-surface flex items-center justify-center text-xs font-mono text-background"
                      style={{ backgroundColor: ['#ffb77f', '#88ceff', '#00C853'][i] }}>
                      {['A', 'B', 'C'][i]}
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-surface bg-border-structural flex items-center justify-center text-[10px] font-bold text-text-main">+9</div>
                </div>
                <span className="label-caps text-muted">12 Scholars currently sprinting</span>
              </div>
              <button className="explorer-btn-primary inline-flex items-center gap-3">
                RESUME MISSION <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
            {/* Decorative */}
            <div className="absolute -bottom-10 -right-10 w-56 h-56 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-[200px]" style={{ color: '#ffb77f', fontVariationSettings: "'wght' 100" }}>waves</span>
            </div>
          </motion.div>

          {/* Side cards */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <motion.div initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bento-card flex-1">
              <div className="flex justify-between items-start mb-4">
                <span className="material-symbols-outlined" style={{ color: '#88ceff' }}>history</span>
                <span className="label-caps text-muted">2 HOURS AGO</span>
              </div>
              <h4 className="label-caps mb-2" style={{ color: '#88ceff' }}>QUICK REVIEW</h4>
              <p className="font-body text-text-main mb-4">Tectonic Plate Boundaries: Divergent vs Convergent zones.</p>
              <button className="w-full py-2 border border-border-structural label-caps hover:bg-surface-hover transition-colors text-muted hover:text-text-main">RECAP NOW</button>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bento-card flex-1">
              <div className="flex justify-between items-start mb-4">
                <span className="material-symbols-outlined" style={{ color: '#00C853' }}>military_tech</span>
                <span className="label-caps text-muted">NEXT TIER</span>
              </div>
              <h4 className="label-caps mb-2" style={{ color: '#00C853' }}>ACHIEVEMENT TRACK</h4>
              <p className="font-body text-text-main mb-4">800 XP to reach Master of Geophysics badge.</p>
              <div className="w-full bg-border-structural h-1 rounded-full overflow-hidden">
                <div className="bg-success h-full" style={{ width: '65%', backgroundColor: '#00C853' }} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Discovery Lab */}
        <div className="mb-8">
          <div className="flex items-end justify-between mb-5">
            <div>
              <h3 className="headline-md" style={{ fontFamily: 'Newsreader, serif', color: '#ffb77f' }}>DISCOVERY LAB</h3>
              <p className="label-caps text-muted mt-1">New pathways identified for your curriculum</p>
            </div>
            <button onClick={() => navigate('/explorer/subjects')} className="text-amber label-caps hover:underline flex items-center gap-2" style={{ color: '#ffb77f' }}>
              EXPLORE ALL <span className="material-symbols-outlined text-[14px]">open_in_new</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {discoveryCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 + 0.3 }}
                className="bento-card group overflow-hidden p-0"
              >
                <div className="h-28 relative overflow-hidden flex items-center justify-center" style={{ backgroundColor: `${card.color}15` }}>
                  <span className="material-symbols-outlined text-[64px] opacity-30 group-hover:opacity-60 transition-opacity" style={{ color: card.color }}>
                    {card.icon}
                  </span>
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #15181F, transparent)' }} />
                </div>
                <div className="p-4">
                  <span className="label-caps" style={{ color: card.color }}>{card.subject}</span>
                  <h5 className="font-body font-semibold text-text-main mt-1">{card.title}</h5>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Weekly Mastery Sprint */}
        <div className="bento-card">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex-1 text-center md:text-left">
              <h3 className="headline-md mb-2" style={{ fontFamily: 'Newsreader, serif', color: '#E2E4E9' }}>WEEKLY MASTERY SPRINT</h3>
              <p className="text-muted font-body mb-6">Complete 3 more modules to unlock the "Oceanic Navigator" holographic badge.</p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {dayLetters.map((d, i) => (
                  <div key={i} className="w-10 h-10 flex items-center justify-center font-mono font-bold text-sm border-2 transition-colors"
                    style={{
                      borderColor: studiedDays.includes(i) ? '#ffb77f' : '#2C313D',
                      backgroundColor: studiedDays.includes(i) ? 'rgba(255,183,127,0.15)' : 'transparent',
                      color: studiedDays.includes(i) ? '#ffb77f' : '#8A919E',
                    }}>
                    {d}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-10">
              <div className="text-center">
                <p className="display-lg leading-none" style={{ fontFamily: 'Newsreader, serif', color: '#ffb77f' }}>2,450</p>
                <p className="label-caps text-muted mt-2">TOTAL XP</p>
              </div>
              <div className="w-px h-16 bg-border-structural" />
              <div className="text-center">
                <p className="display-lg leading-none" style={{ fontFamily: 'Newsreader, serif', color: '#00C853' }}>85%</p>
                <p className="label-caps text-muted mt-2">ACCURACY</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FAB */}
      <button
        onClick={() => navigate('/explorer/learning-space')}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all z-50 group hover:scale-110 active:scale-95"
        style={{ backgroundColor: '#ffb77f' }}
      >
        <span className="material-symbols-outlined text-background text-[28px] group-hover:rotate-90 transition-transform">add</span>
      </button>
    </div>
  )
}
