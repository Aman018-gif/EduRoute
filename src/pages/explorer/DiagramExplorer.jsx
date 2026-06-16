import { useState } from 'react'
import { motion } from 'framer-motion'
import { formulas } from '../../data/curriculum'

const subjects = ['All', 'Physics', 'Chemistry', 'Mathematics']

export default function DiagramExplorer() {
  const [activeSubject, setActiveSubject] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFormula, setActiveFormula] = useState(null)

  const filtered = formulas.filter(f =>
    (activeSubject === 'All' || f.subject === activeSubject) &&
    (f.title.toLowerCase().includes(searchTerm.toLowerCase()) || f.formula.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const diagrams = [
    { title: 'Cell Structure', subject: 'Biology', icon: 'biotech', color: '#00C853', desc: 'Eukaryotic cell with labeled organelles' },
    { title: 'Electromagnetic Spectrum', subject: 'Physics', icon: 'radio_button_checked', color: '#FF8A00', desc: 'From radio waves to gamma rays' },
    { title: 'Periodic Table', subject: 'Chemistry', icon: 'table_chart', color: '#88ceff', desc: 'Interactive element reference' },
    { title: 'Human Skeleton', subject: 'Biology', icon: 'accessibility_new', color: '#00C853', desc: '206 bones with labels' },
    { title: 'Circuit Diagrams', subject: 'Physics', icon: 'electrical_services', color: '#FF8A00', desc: 'Basic circuit components' },
    { title: 'Coordinate Geometry', subject: 'Mathematics', icon: 'grid_on', color: '#AA77FF', desc: 'Cartesian plane concepts' },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <header className="h-20 border-b border-border-structural px-8 flex items-center justify-between flex-shrink-0 bg-background/95 sticky top-0 z-10">
        <div>
          <h2 className="headline-md" style={{ fontFamily: 'Newsreader, serif', color: '#ffb77f' }}>Diagram &amp; Formula Explorer</h2>
          <p className="text-muted text-sm font-body">Interactive STEM reference library</p>
        </div>
        <input
          placeholder="Search formulas..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-56 bg-surface border border-border-structural rounded px-3 py-2 text-sm text-text-main placeholder-muted focus:outline-none focus:border-amber transition-colors font-body"
          style={{ '--tw-ring-color': '#ffb77f' }}
        />
      </header>

      <div className="p-8 space-y-10 max-w-[1100px] mx-auto w-full">
        {/* Diagrams Section */}
        <section>
          <h3 className="label-caps text-muted mb-5">INTERACTIVE DIAGRAMS</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {diagrams.map((d, i) => (
              <motion.div key={d.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bento-card group cursor-pointer h-40 flex flex-col justify-between relative overflow-hidden"
                style={{ borderColor: 'transparent' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = d.color + '60'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#2C313D'}
              >
                <div>
                  <span className="label-caps" style={{ color: d.color }}>{d.subject}</span>
                  <h4 className="font-body font-semibold text-text-main mt-1">{d.title}</h4>
                  <p className="text-muted text-xs font-body mt-1">{d.desc}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-muted">Interactive →</span>
                  <span className="material-symbols-outlined text-[20px]" style={{ color: d.color }}>{d.icon}</span>
                </div>
                <div className="absolute -bottom-4 -right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="material-symbols-outlined text-[80px]" style={{ color: d.color }}>{d.icon}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Formulas Section */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h3 className="label-caps text-muted">FORMULA SHEET</h3>
            <div className="flex gap-2">
              {subjects.map(s => (
                <button key={s} onClick={() => setActiveSubject(s)}
                  className="px-3 py-1 label-caps text-xs border transition-all"
                  style={{
                    borderColor: activeSubject === s ? '#ffb77f' : '#2C313D',
                    backgroundColor: activeSubject === s ? 'rgba(255,183,127,0.1)' : 'transparent',
                    color: activeSubject === s ? '#ffb77f' : '#8A919E',
                  }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((f, i) => (
              <motion.div key={f.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                className="bento-card cursor-pointer group"
                onClick={() => setActiveFormula(activeFormula?.id === f.id ? null : f)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="label-caps" style={{ color: { Physics: '#FF8A00', Chemistry: '#88ceff', Mathematics: '#AA77FF', Biology: '#00C853' }[f.subject] || '#ffb77f' }}>
                      {f.subject}
                    </span>
                    <h4 className="font-body font-semibold text-text-main mt-0.5">{f.title}</h4>
                  </div>
                  <span className="material-symbols-outlined text-muted text-[16px] group-hover:text-amber transition-colors">
                    {activeFormula?.id === f.id ? 'expand_less' : 'expand_more'}
                  </span>
                </div>
                {/* Formula display */}
                <div className="py-3 px-4 bg-background border border-border-structural rounded mb-3">
                  <p className="font-mono text-xl text-text-main text-center tracking-wider">{f.formula}</p>
                </div>
                {activeFormula?.id === f.id && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <p className="text-sm text-muted font-body mb-3">{f.desc}</p>
                    <div className="flex gap-2">
                      {f.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-mono px-2 py-0.5 border border-border-structural rounded text-muted">{tag}</span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
