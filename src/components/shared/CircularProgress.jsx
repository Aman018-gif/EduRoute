// Animated SVG circular progress ring
export default function CircularProgress({ value = 0, size = 60, strokeWidth = 4, color = '#FF8A00', bg = '#2C313D', label }) {
  const r = (size - strokeWidth * 2) / 2
  const circumference = 2 * Math.PI * r
  const offset = circumference - (value / 100) * circumference
  const center = size / 2

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        className="w-full h-full transform -rotate-90"
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Track */}
        <circle
          cx={center} cy={center} r={r}
          fill="none" stroke={bg} strokeWidth={strokeWidth}
        />
        {/* Progress */}
        <circle
          cx={center} cy={center} r={r}
          fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
      </svg>
      <span
        className="absolute font-mono font-semibold"
        style={{ fontSize: size * 0.22, color: '#E2E4E9' }}
      >
        {label ?? `${value}%`}
      </span>
    </div>
  )
}
