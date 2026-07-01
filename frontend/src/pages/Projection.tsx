import React from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

function Projection() {
  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center">
      {/* Main Projection Area */}
      <div className="w-full h-full flex flex-col items-center justify-center bg-black text-white">
        <h1 className="text-6xl font-bold text-center mb-8">EcclesiApp - Projection</h1>
        <p className="text-2xl text-gray-400">Aquí aparecerán las canciones y versículos</p>
      </div>

      {/* Control Bar */}
      <div className="fixed bottom-4 left-0 right-0 flex justify-center gap-4">
        <button className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-lg transition">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition flex items-center gap-2">
          <X className="w-5 h-5" />
          Cerrar
        </button>
        <button className="bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-lg transition">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

export default Projection
