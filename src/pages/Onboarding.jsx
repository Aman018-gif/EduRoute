import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { motion } from 'framer-motion'

const classes = [6, 7, 8, 9, 10, 11, 12]

export default function Onboarding() {
  const [name, setName] = useState('')
  const [selectedClass, setSelectedClass] = useState(null)
  const [step, setStep] = useState(1)
  const { login } = useUser()
  const navigate = useNavigate()

  const handleContinue = () => {
    if (step === 1 && name.trim()) {
      setStep(2)
    } else if (step === 2 && selectedClass) {
      login(name.trim(), selectedClass)
      const mode = selectedClass <= 9 ? 'explorer' : 'scholar'
      navigate(`/${mode}/dashboard`)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 dot-grid-bg opacity-30 pointer-events-none" />
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-amber/5 blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-lg px-6"
      >
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded bg-primary flex items-center justify-center text-background font-bold font-mono text-lg">
              E
            </div>
            <h1 className="text-text-main text-2xl font-semibold font-body tracking-wide">Eduroute</h1>
          </div>
          <p className="text-muted text-sm font-mono uppercase tracking-widest">The Focused Scholar Ecosystem</p>
        </div>

        {/* Card */}
        <div className="bg-surface border border-border rounded-md p-8">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="text-primary font-mono text-xs uppercase tracking-widest mb-2">Step 1 of 2</p>
              <h2 className="font-heading text-3xl text-text-main mb-2">What should we call you?</h2>
              <p className="text-muted text-sm mb-8 font-body">Your name appears on your Scholar profile and progress reports.</p>
              <input
                id="scholar-name"
                type="text"
                placeholder="Enter your name..."
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleContinue()}
                className="scholar-input mb-6 text-base"
                autoFocus
              />
              <button
                onClick={handleContinue}
                disabled={!name.trim()}
                className="w-full scholar-btn-primary justify-center py-3 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="text-primary font-mono text-xs uppercase tracking-widest mb-2">Step 2 of 2</p>
              <h2 className="font-heading text-3xl text-text-main mb-2">Select your class</h2>
              <p className="text-muted text-sm mb-8 font-body">
                Classes 6–9 enter <span className="text-amber font-semibold">Explorer Mode</span>. Classes 10–12 enter <span className="text-primary font-semibold">Scholar Mode</span>.
              </p>

              <div className="grid grid-cols-4 gap-3 mb-8">
                {classes.map(cls => {
                  const isExplorer = cls <= 9
                  const color = isExplorer ? '#ffb77f' : '#FF8A00'
                  const isSelected = selectedClass === cls
                  return (
                    <button
                      key={cls}
                      id={`class-${cls}`}
                      onClick={() => setSelectedClass(cls)}
                      className="relative py-4 rounded border-2 font-mono font-semibold text-lg transition-all duration-200 hover:scale-105"
                      style={{
                        borderColor: isSelected ? color : '#2C313D',
                        backgroundColor: isSelected ? `${color}15` : '#15181F',
                        color: isSelected ? color : '#8A919E',
                      }}
                    >
                      {cls}
                      {isSelected && (
                        <span
                          className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-background"
                          style={{ backgroundColor: color, fontSize: '10px' }}
                        >
                          ✓
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>

              {selectedClass && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-3 rounded border flex items-center gap-3"
                  style={{
                    borderColor: selectedClass <= 9 ? '#ffb77f33' : '#FF8A0033',
                    backgroundColor: selectedClass <= 9 ? '#ffb77f08' : '#FF8A0008',
                  }}
                >
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={{ color: selectedClass <= 9 ? '#ffb77f' : '#FF8A00' }}
                  >
                    {selectedClass <= 9 ? 'explore' : 'school'}
                  </span>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider" style={{ color: selectedClass <= 9 ? '#ffb77f' : '#FF8A00' }}>
                      {selectedClass <= 9 ? 'Explorer Mode' : 'Scholar Mode'}
                    </p>
                    <p className="text-muted text-xs font-body mt-0.5">
                      {selectedClass <= 9 ? 'Gamified learning journey for curious minds' : 'High-performance exam prep environment'}
                    </p>
                  </div>
                </motion.div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="scholar-btn-ghost flex-shrink-0"
                >
                  Back
                </button>
                <button
                  onClick={handleContinue}
                  disabled={!selectedClass}
                  className="flex-1 scholar-btn-primary justify-center py-3 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={selectedClass && selectedClass <= 9 ? { backgroundColor: '#ffb77f', color: '#0B0D11' } : {}}
                >
                  Enter {selectedClass && selectedClass <= 9 ? 'Explorer Mode' : 'Scholar Mode'}
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>

        <p className="text-center text-muted text-xs font-mono mt-6 uppercase tracking-wider">
          No account needed · All progress saved locally
        </p>
      </motion.div>
    </div>
  )
}
