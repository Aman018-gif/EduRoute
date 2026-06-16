import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { UserProvider, useUser } from './context/UserContext'

// Layouts
import ScholarLayout from './layouts/ScholarLayout'
import ExplorerLayout from './layouts/ExplorerLayout'

// Onboarding
import Onboarding from './pages/Onboarding'

// Scholar Pages
import ScholarDashboard from './pages/scholar/Dashboard'
import StudyHub from './pages/scholar/StudyHub'
import ExamSprint from './pages/scholar/ExamSprint'
import RevisionMode from './pages/scholar/RevisionMode'
import TopicExplorer from './pages/scholar/TopicExplorer'
import SubjectBrowser from './pages/scholar/SubjectBrowser'
import Analytics from './pages/scholar/Analytics'
import ExamMode from './pages/scholar/ExamMode'

// Explorer Pages
import ExplorerDashboard from './pages/explorer/Dashboard'
import MyLearningJourney from './pages/explorer/MyLearningJourney'
import LearningSpace from './pages/explorer/LearningSpace'
import TrophyRoom from './pages/explorer/TrophyRoom'
import WeeklyMission from './pages/explorer/WeeklyMission'
import DiagramExplorer from './pages/explorer/DiagramExplorer'
import KnowledgeMap from './pages/explorer/KnowledgeMap'
import ExplorerSubjectBrowser from './pages/explorer/SubjectBrowser'

function ProtectedRoute({ children, mode }) {
  const { user } = useUser()
  if (!user) return <Navigate to="/" replace />
  if (mode && user.mode !== mode) {
    return <Navigate to={`/${user.mode}/dashboard`} replace />
  }
  return children
}

function AppRoutes() {
  const { user } = useUser()
  return (
    <Routes>
      {/* Onboarding */}
      <Route path="/" element={
        user ? <Navigate to={`/${user.mode}/dashboard`} replace /> : <Onboarding />
      } />

      {/* Scholar Routes (Class 10-12) */}
      <Route path="/scholar" element={
        <ProtectedRoute mode="scholar"><ScholarLayout /></ProtectedRoute>
      }>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<ScholarDashboard />} />
        <Route path="study-hub" element={<StudyHub />} />
        <Route path="exam-sprint" element={<ExamSprint />} />
        <Route path="revision" element={<RevisionMode />} />
        <Route path="topic-explorer" element={<TopicExplorer />} />
        <Route path="subjects" element={<SubjectBrowser />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="exam-mode" element={<ExamMode />} />
      </Route>

      {/* Explorer Routes (Class 6-9) */}
      <Route path="/explorer" element={
        <ProtectedRoute mode="explorer"><ExplorerLayout /></ProtectedRoute>
      }>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<ExplorerDashboard />} />
        <Route path="journey" element={<MyLearningJourney />} />
        <Route path="learning-space" element={<LearningSpace />} />
        <Route path="trophy-room" element={<TrophyRoom />} />
        <Route path="weekly-mission" element={<WeeklyMission />} />
        <Route path="diagram-explorer" element={<DiagramExplorer />} />
        <Route path="knowledge-map" element={<KnowledgeMap />} />
        <Route path="subjects" element={<ExplorerSubjectBrowser />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </UserProvider>
  )
}
