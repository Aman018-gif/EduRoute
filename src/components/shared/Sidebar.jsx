import { NavLink, useNavigate } from 'react-router-dom'
import { useUser } from '../../context/UserContext'

const scholarNav = [
  { to: '/scholar/dashboard', icon: 'dashboard', label: 'Dashboard' },
  { to: '/scholar/study-hub', icon: 'menu_book', label: 'Study Hub' },
  { to: '/scholar/exam-sprint', icon: 'timer', label: 'Exam Sprint' },
  { to: '/scholar/revision', icon: 'account_tree', label: 'Revision' },
  { to: '/scholar/topic-explorer', icon: 'explore', label: 'Topics' },
  { to: '/scholar/subjects', icon: 'auto_stories', label: 'Subjects' },
  { to: '/scholar/analytics', icon: 'bar_chart', label: 'Analytics' },
  { to: '/scholar/exam-mode', icon: 'school', label: 'Exam Mode' },
]

const explorerNav = [
  { to: '/explorer/dashboard', icon: 'dashboard', label: 'Mission Control' },
  { to: '/explorer/journey', icon: 'route', label: 'My Journey' },
  { to: '/explorer/subjects', icon: 'menu_book', label: 'Curriculum' },
  { to: '/explorer/learning-space', icon: 'auto_stories', label: 'Learning Space' },
  { to: '/explorer/trophy-room', icon: 'emoji_events', label: 'Trophy Room' },
  { to: '/explorer/weekly-mission', icon: 'flag', label: 'Weekly Mission' },
  { to: '/explorer/diagram-explorer', icon: 'biotech', label: 'Diagrams & Formulas' },
  { to: '/explorer/knowledge-map', icon: 'hub', label: 'Knowledge Map' },
]

export default function Sidebar({ mode = 'scholar' }) {
  const { user, logout } = useUser()
  const navigate = useNavigate()
  const navItems = mode === 'scholar' ? scholarNav : explorerNav
  const primary = mode === 'scholar' ? '#FF8A00' : '#ffb77f'

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <aside
      className="w-[240px] flex-shrink-0 border-r border-border bg-background flex flex-col h-screen sticky top-0"
      style={{ borderColor: '#2C313D' }}
    >
      {/* Brand */}
      <div className="p-6 border-b" style={{ borderColor: '#2C313D' }}>
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded flex items-center justify-center font-mono font-bold text-background text-sm"
            style={{ backgroundColor: primary }}
          >
            E
          </div>
          <div>
            <h1 className="text-text-main text-base font-semibold leading-none tracking-wide font-body">
              Eduroute
            </h1>
            <p className="text-muted text-[10px] mt-1 font-mono uppercase tracking-widest">
              {mode === 'scholar' ? 'Scholar' : 'Explorer'}
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-0.5">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-all duration-150 border-l-2 rounded-r cursor-pointer ${
                isActive
                  ? 'border-l-2 bg-surface-hover text-text-main'
                  : 'border-transparent text-muted hover:text-text-main hover:bg-surface'
              }`
            }
            style={({ isActive }) => isActive ? { borderLeftColor: primary, color: '#E2E4E9' } : {}}
          >
            {({ isActive }) => (
              <>
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1, 'wght' 400" : "'FILL' 0, 'wght' 300" }}
                >
                  {item.icon}
                </span>
                <span className="font-body">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Footer */}
      <div className="p-4 border-t" style={{ borderColor: '#2C313D' }}>
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-background text-xs font-bold font-mono flex-shrink-0"
            style={{ backgroundColor: primary }}
          >
            {user?.name?.[0]?.toUpperCase() || 'S'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate text-text-main font-body">{user?.name || 'Scholar'}</p>
            <p className="text-xs text-muted truncate font-mono">Class {user?.classGrade}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-muted hover:text-danger transition-colors text-xs font-mono uppercase tracking-wider w-full"
        >
          <span className="material-symbols-outlined text-[16px]">logout</span>
          Log Out
        </button>
      </div>
    </aside>
  )
}
