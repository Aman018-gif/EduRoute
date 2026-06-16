import { useEffect, useState } from 'react'

export default function LoadingBar({ color = '#FF8A00' }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 800)
    return () => clearTimeout(t)
  }, [])

  if (!visible) return null

  return (
    <div
      className="page-load-bar"
      style={{ backgroundColor: color }}
    />
  )
}
