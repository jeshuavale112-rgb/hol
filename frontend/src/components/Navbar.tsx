import React from 'react'
import { Menu, Bell, Settings, LogOut } from 'lucide-react'

interface NavbarProps {
  onMenuClick?: () => void
}

function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">EcclesiApp</h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
          <Bell className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
          <Settings className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-red-600">
          <LogOut className="w-6 h-6" />
        </button>
      </div>
    </nav>
  )
}

export default Navbar
