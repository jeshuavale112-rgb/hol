import React from 'react'
import { BookOpen, Search } from 'lucide-react'

function Bible() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-8 h-8" />
          Biblia
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">Busca y gestiona versículos bíblicos</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar versículos (ej: Juan 3:16)..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition">
            Buscar
          </button>
        </div>
      </div>

      <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <BookOpen className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-300 text-lg">Busca un versículo para comenzar</p>
      </div>
    </div>
  )
}

export default Bible
