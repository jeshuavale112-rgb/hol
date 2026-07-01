import React from 'react'
import { Calendar, Plus } from 'lucide-react'

function Services() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-8 h-8" />
            Servicios
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Planifica y gestiona tus servicios religiosos</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
          <Plus className="w-5 h-5" />
          Nuevo Servicio
        </button>
      </div>

      <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <Calendar className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-300 text-lg">No hay servicios aún</p>
      </div>
    </div>
  )
}

export default Services
