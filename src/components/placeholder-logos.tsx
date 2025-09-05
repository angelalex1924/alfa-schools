// Placeholder logo components - these would normally be imported from their respective files
// For now, I'll create simple placeholders

export const StreamitLogo = ({ size = "default", className = "" }) => (
  <div className={`text-red-500 ${size === "sm" ? "w-6 h-6" : "w-8 h-8"} ${className}`}>
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z"/>
    </svg>
  </div>
)

export const SpeedtestLogo = ({ size = "default", className = "" }) => (
  <div className={`text-blue-500 ${size === "sm" ? "w-6 h-6" : "w-8 h-8"} ${className}`}>
    <svg viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M12 6v6l4 2"/>
    </svg>
  </div>
)

export const AcronFlowLogo = ({ size = "default", showBadge = true, className = "" }) => (
  <div className={`text-indigo-500 ${size === "sm" ? "w-6 h-6" : "w-8 h-8"} ${className}`}>
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  </div>
)

export const AcronTextLogo = ({ className = "" }) => (
  <div className={`text-pink-500 w-6 h-6 ${className}`}>
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
      <path d="M14 2v6h6"/>
      <path d="M16 13H8"/>
      <path d="M16 17H8"/>
      <path d="M10 9H8"/>
    </svg>
  </div>
)

export const LockIcon = ({ className = "" }) => (
  <div className={`text-gray-500 w-6 h-6 ${className}`}>
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  </div>
)

export const AcronWebLogo = ({ size = "default", textSize = "default", animated = false, variant = "horizontal", className = "" }) => (
  <div className={`text-blue-600 ${className}`}>
    <span className="font-bold">ACRON</span>
    <span className="text-gray-700 dark:text-white">WEB</span>
  </div>
)

export const AcronwebCookiesLogo = ({ className = "" }) => (
  <div className={`text-amber-500 w-8 h-8 ${className}`}>
    <svg viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="8" cy="8" r="2"/>
      <circle cx="16" cy="8" r="2"/>
      <circle cx="8" cy="16" r="2"/>
      <circle cx="16" cy="16" r="2"/>
    </svg>
  </div>
)

export const AcronWebIDLogo = ({ size = "default", showText = true, iconClassName = "" }) => (
  <div className={`text-teal-500 ${size === "sm" ? "w-6 h-6" : "w-8 h-8"} ${iconClassName}`}>
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  </div>
)

export const ApplicationsIcon = ({ className = "" }) => (
  <div className={`text-indigo-500 w-6 h-6 ${className}`}>
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
    </svg>
  </div>
)
