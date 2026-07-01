import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Music, Calendar, Bible, Settings, ChevronLeft } from 'lucide-react'

interface SidebarProps {
  open: boolean
  onToggle?: () => void
}

function Sidebar({ open, onToggle }: SidebarProps) {
  const location = useLocation()

  const links = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/songs', icon: Music, label: 'Canciones' },
    { path: '/services', icon: Calendar, label: 'Servicios' },
    { path: '/bible', icon: Bible, label: 'Biblia' },
    { path: '/settings', icon: Settings, label: 'Configuración' },
  ]

  return (
    <aside
      className={`${
        open ? 'w-64' : 'w-20'
      } bg-gray-900 text-white transition-all duration-300 flex flex-col`}
    >
      {/* Logo */}
      <div className="p-4 flex items-center justify-between">
        {open && <span className="font-bold text-lg">Ecclesi</span>}
        <button
          onClick={onToggle}
          className="p-1 hover:bg-gray-800 rounded-lg"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-2">
        {links.map((link) => {
          const isActive = location.pathname === link.path
          const Icon = link.icon
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-4 px-3 py-2 rounded-lg transition ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Icon className="w-6 h-6" />
              {open && <span>{link.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        {open && <p className="text-xs text-gray-400">EcclesiApp v1.0.0</p>}
      </div>
    </aside>
  )
}

export default Sidebar
