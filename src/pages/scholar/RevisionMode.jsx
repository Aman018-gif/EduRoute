import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const concepts = [
  { id: 'cell', label: 'Cell Biology', x: 50, y: 50, color: '#00C853', links: ['dna', 'organelle'] },
  { id: 'dna', label: 'DNA & Genetics', x: 75, y: 25, color: '#FF8A00', links: ['cell', 'evolution'] },
  { id: 'organelle', label: 'Organelles', x: 25, y: 25, color: '#88ceff', links: ['cell', 'membrane'] },
  { id: 'membrane', label: 'Cell Membrane', x: 15, y: 65, color: '#AA77FF', links: ['organelle', 'transport'] },
  { id: 'transport', label: 'Transport', x: 35, y: 80, color: '#FF8A00', links: ['membrane'] },
  { id: 'evolution', label: 'Evolution', x: 85, y: 60, color: '#00C853', links: ['dna', 'species'] },
  { id: 'species', label: 'Species', x: 72, y: 80, color: '#88ceff', links: ['evolution'] },
]

export default function RevisionMode() {
  const navigate = useNavigate()
  const [selectedNode, setSelectedNode] = useState(null)
  const [zoom, setZoom] = useState(1)
  const [activeSubject, setActiveSubject] = useState('Biology')

  const subjects = ['Biology', 'Physics', 'Chemistry', 'Mathematics']

  return (
    <div className="flex flex-col h-screen">
      <header className="h-12 border-b border-border flex items-center px-6 flex-shrink-0 bg-surface">
        <button onClick={() => navigate('/scholar/dashboard')} className="flex items-center text-muted hover:text-text-main transition-colors mr-4 group">
          <span className="material-symbols-outlined mr-1.5 text-[18px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
          <span className="text-[12px] font-mono uppercase tracking-wide">Dashboard</span>
        </button>
        <div className="h-4 w-px bg-border mx-2" />
        <span className="font-heading text-xl font-semibold text-text-main">Revision Mode</span>
        <div className="ml-auto flex items-center gap-3">
          {/* Subject tabs */}
          {subjects.map(s => (
            <button key={s} onClick={() => setActiveSubject(s)}
              className={`text-xs font-mono uppercase tracking-wider px-3 py-1.5 rounded transition-all ${
                activeSubject === s ? 'bg-primary text-background' : 'text-muted hover:text-text-main border border-border hover:border-primary/40'
              }`}
            >
              {s}
            </button>
          ))}
          <div className="flex items-center gap-1 border border-border rounded overflow-hidden">
            <button onClick={() => setZoom(z => Math.max(0.6, z - 0.2))} className="px-2 py-1 text-muted hover:text-text-main hover:bg-surface transition-colors">
              <span className="material-symbols-outlined text-[16px]">remove</span>
            </button>
            <span className="text-xs font-mono text-muted px-1">{Math.round(zoom * 100)}%</span>
            <button onClick={() => setZoom(z => Math.min(1.6, z + 0.2))} className="px-2 py-1 text-muted hover:text-text-main hover:bg-surface transition-colors">
              <span className="material-symbols-outlined text-[16px]">add</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Canvas */}
        <div className="flex-1 relative overflow-hidden bg-background dot-grid-bg">
          <div
            className="absolute inset-0 transition-transform duration-300"
            style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
          >
            {/* SVG Links */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {concepts.map(node =>
                node.links.map(targetId => {
                  const target = concepts.find(c => c.id === targetId)
                  if (!target) return null
                  return (
                    <line
                      key={`${node.id}-${targetId}`}
                      x1={`${node.x}%`} y1={`${node.y}%`}
                      x2={`${target.x}%`} y2={`${target.y}%`}
                      stroke="#2C313D" strokeWidth={2}
                      strokeDasharray={selectedNode === node.id || selectedNode === targetId ? '0' : '4 6'}
                      style={{ stroke: selectedNode === node.id || selectedNode === targetId ? '#FF8A00' : '#2C313D', opacity: 0.7 }}
                    />
                  )
                })
              )}
            </svg>

            {/* Nodes */}
            {concepts.map(node => (
              <motion.button
                key={node.id}
                onClick={() => setSelectedNode(node.id === selectedNode ? null : node.id)}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, delay: concepts.indexOf(node) * 0.05 }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <div
                  className={`rounded-full flex items-center justify-center text-background font-mono font-bold text-xs shadow-lg transition-all duration-200 ${
                    selectedNode === node.id ? 'scale-110' : 'hover:scale-105'
                  }`}
                  style={{
                    width: 100, height: 100,
                    backgroundColor: node.color,
                    boxShadow: selectedNode === node.id ? `0 0 25px ${node.color}66` : 'none',
                  }}
                >
                  <span className="px-2 text-center leading-tight">{node.label}</span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Zoom hint */}
          <div className="absolute bottom-4 left-4 text-muted text-xs font-mono">
            Click a node to highlight connections · Scroll to zoom
          </div>
        </div>

        {/* Info panel */}
        <aside className="w-[280px] flex-shrink-0 border-l border-border bg-surface flex flex-col">
          <div className="p-4 border-b border-border">
            <h3 className="text-xs font-mono text-muted uppercase tracking-wider">Concept Details</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {selectedNode ? (() => {
              const node = concepts.find(c => c.id === selectedNode)
              const linked = node.links.map(id => concepts.find(c => c.id === id)).filter(Boolean)
              return (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={selectedNode}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: `${node.color}20`, border: `2px solid ${node.color}` }}>
                    <span className="material-symbols-outlined text-[22px]" style={{ color: node.color }}>hub</span>
                  </div>
                  <h4 className="font-heading text-2xl text-text-main mb-2">{node.label}</h4>
                  <p className="text-muted text-sm font-body leading-relaxed mb-6">
                    This concept is a key topic in {activeSubject}. Understanding it deeply helps in connecting related areas of study.
                  </p>
                  <div>
                    <p className="text-xs font-mono text-muted uppercase tracking-wider mb-3">Connected Concepts</p>
                    <div className="space-y-2">
                      {linked.map(l => (
                        <button key={l.id} onClick={() => setSelectedNode(l.id)}
                          className="w-full flex items-center gap-3 p-2.5 bg-background border border-border rounded text-left hover:border-primary/40 transition-colors">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: l.color }} />
                          <span className="text-sm text-text-main font-body">{l.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <button className="w-full mt-6 scholar-btn-primary justify-center py-2.5 text-xs">
                    <span className="material-symbols-outlined text-[14px]">menu_book</span>
                    Study This Concept
                  </button>
                </motion.div>
              )
            })() : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <span className="material-symbols-outlined text-muted text-[48px] mb-4">account_tree</span>
                <p className="text-muted text-sm font-body leading-relaxed">Click any node on the map to see its connections and details.</p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
