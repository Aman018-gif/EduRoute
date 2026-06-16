import { Outlet } from 'react-router-dom'
import Sidebar from '../components/shared/Sidebar'
import LoadingBar from '../components/shared/LoadingBar'

export default function ScholarLayout() {
  return (
    <div className="flex h-screen bg-background text-text-main overflow-hidden">
      <LoadingBar color="#FF8A00" />
      <Sidebar mode="scholar" />
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <Outlet />
      </div>
    </div>
  )
}
