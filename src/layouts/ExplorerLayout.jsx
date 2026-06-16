import { Outlet } from 'react-router-dom'
import Sidebar from '../components/shared/Sidebar'
import LoadingBar from '../components/shared/LoadingBar'

export default function ExplorerLayout() {
  return (
    <div className="flex h-screen bg-background text-text-main overflow-hidden">
      <LoadingBar color="#ffb77f" />
      <Sidebar mode="explorer" />
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <Outlet />
      </div>
    </div>
  )
}
