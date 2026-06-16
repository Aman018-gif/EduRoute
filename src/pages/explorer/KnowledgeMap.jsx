import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const concepts = [
  { id: 'ocean', label: 'Oceanic Ecosystems', x: 50, y: 45, color: '#88ceff', links: ['hydrothermal', 'coral', 'plankton'] },
  { id: 'hydrothermal', label: 'Hydrothermal Vents', x: 25, y: 20, color: '#FF8A00', links: ['ocean', 'chemosynthesis'] },
  { id: 'coral', label: 'Coral Reefs', x: 75, y: 20, color: '#00C853', links: ['ocean', 'biodiversity'] },
  { id: 'plankton', label: 'Plankton', x: 50, y: 75, color: '#ffb77f', links: ['ocean', 'food-chain'] },
  { id: 'chemosynthesis', label: 'Chemosynthesis', x: 10, y: 55, color: '#AA77FF', links: ['hydrothermal'] },
  { id: 'biodiversity', label: 'Biodiversity', x: 88, y: 55, color: '#00C853', links: ['coral'] },
  { id: 'food-chain', label: 'Food Chain', x: 30, y: 82, color: '#FF8A00', links: ['plankton'] },
]

export default function KnowledgeMap() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)
  const [zoom, setZoom] = useState(1)

  return (
    <div className="flex flex-col h-screen">
      <header className="h-16 border-b border-border-structural flex items-center px-8 bg-background flex-shrink-0 justify-between">
        <div className="flex items-center gap-3">
          <span className="headline-md" style={{ fontFamily: 'Newsreader, serif', color: '#ffb77f' }}>Knowledge Map</span>
          <div className="h-4 w-px bg-border-structural" />
          <span className="label-caps text-muted">Oceanic Ecosystems</span>
        </div>
        <div className="flex items-center gap-2 border border-border-structural rounded overflow-hidden">
          <button onClick={() => setZoom(z => Math.max(0.5, z - 0.2))} className="px-2 py-1 text-muted hover:text-text-main hover:bg-surface transition-colors">
            <span className="material-symbols-outlined text-[16px]">remove</span>
          </button>
          <span className="text-xs font-mono text-muted px-1">{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom(z => Math.min(2, z + 0.2))} className="px-2 py-1 text-muted hover:text-text-main hover:bg-surface transition-colors">
            <span className="material-symbols-outlined text-[16px]">add</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 relative bg-background dot-grid-bg overflow-hidden">
          <div className="absolute inset-0 transition-transform duration-300" style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}>
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {concepts.map(node => node.links.map(targetId => {
                const t = concepts.find(c => c.id === targetId)
                if (!t) return null
                const isHighlighted = selected === node.id || selected === targetId
                return (
                  <line key={`${node.id}-${targetId}`}
                    x1={`${node.x}%`} y1={`${node.y}%`} x2={`${t.x}%`} y2={`${t.y}%`}
                    stroke={isHighlighted ? node.color : '#2C313D'}
                    strokeWidth={isHighlighted ? 3 : 2}
                    strokeDasharray={isHighlighted ? '0' : '5 8'}
                    opacity={isHighlighted ? 0.8 : 0.5}
                  />
                )
              }))}
            </svg>

            {concepts.map((node, i) => (
              <motion.button key={node.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', delay: i * 0.08 }}
                onClick={() => setSelected(node.id === selected ? null : node.id)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="rounded-full flex items-center justify-center transition-all duration-200"
                    style={{
                      width: node.id === 'ocean' ? 110 : 80,
                      height: node.id === 'ocean' ? 110 : 80,
                      backgroundColor: `${node.color}20`,
                      border: `2px solid ${node.color}`,
                      boxShadow: selected === node.id ? `0 0 24px ${node.color}60` : 'none',
                      transform: selected === node.id ? 'scale(1.1)' : 'scale(1)',
                    }}>
                    <span className="font-body text-xs font-semibold px-2 text-center leading-tight" style={{ color: node.color }}>
                      {node.label}
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="absolute bottom-4 left-4 label-caps text-muted text-[10px]">
            Click nodes to highlight connections
          </div>
        </div>

        {/* Info Panel */}
        <aside className="w-[260px] flex-shrink-0 border-l border-border-structural bg-surface flex flex-col">
          <div className="p-4 border-b border-border-structural">
            <span className="label-caps text-muted">CONCEPT INFO</span>
          </div>
          <div className="flex-1 p-4">
            {selected ? (() => {
              const node = concepts.find(c => c.id === selected)
              const linked = node.links.map(id => concepts.find(c => c.id === id)).filter(Boolean)
              return (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={selected} className="space-y-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${node.color}20`, border: `2px solid ${node.color}` }}>
                    <span className="material-symbols-outlined text-[24px]" style={{ color: node.color }}>hub</span>
                  </div>
                  <h4 className="font-body font-semibold text-text-main text-lg">{node.label}</h4>
                  <p className="text-muted text-sm font-body leading-relaxed">This is a key concept connecting several important ideas in Oceanic Ecosystems. Tap connected nodes to explore relationships.</p>
                  <div>
                    <p className="label-caps text-muted mb-2">CONNECTED TO</p>
                    <div className="space-y-2">
                      {linked.map(l => (
                        <button key={l.id} onClick={() => setSelected(l.id)}
                          className="w-full flex items-center gap-2 p-2.5 bg-background border border-border-structural rounded hover:border-amber transition-colors text-left">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: l.color }} />
                          <span className="text-sm font-body text-text-main">{l.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })() : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <span className="material-symbols-outlined text-muted text-[40px] mb-3">account_tree</span>
                <p className="text-muted text-sm font-body">Select a concept node to explore its connections.</p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
