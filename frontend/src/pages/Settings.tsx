import React from 'react'
import { Settings, Moon, Sun } from 'lucide-react'

function SettingsPage() {
  const [darkMode, setDarkMode] = React.useState(false)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Settings className="w-8 h-8" />
          Configuración
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">Personaliza tu experiencia en EcclesiApp</p>
      </div>

      {/* Appearance Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Apariencia</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {darkMode ? (
              <Moon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            ) : (
              <Sun className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            )}
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Modo oscuro</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Cambia el tema de la aplicación</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
            className="w-6 h-6 cursor-pointer"
          />
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
