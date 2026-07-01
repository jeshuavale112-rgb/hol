import React from 'react'
import { Music, Users, BookOpen, Calendar } from 'lucide-react'

function Dashboard() {
  const stats = [
    { label: 'Canciones', value: '0', icon: Music, color: 'blue' },
    { label: 'Servicios', value: '0', icon: Calendar, color: 'purple' },
    { label: 'Usuarios', value: '0', icon: Users, color: 'green' },
    { label: 'Versículos', value: '0', icon: BookOpen, color: 'orange' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Bienvenido a EcclesiApp</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Plataforma profesional para iglesias</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          const colorClasses = {
            blue: 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-200',
            purple: 'bg-purple-50 dark:bg-purple-900 text-purple-600 dark:text-purple-200',
            green: 'bg-green-50 dark:bg-green-900 text-green-600 dark:text-green-200',
            orange: 'bg-orange-50 dark:bg-orange-900 text-orange-600 dark:text-orange-200',
          }

          return (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
                </div>
                <div className={`p-4 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                  <Icon className="w-8 h-8" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Comienza tu jornada</h2>
        <p className="mb-6">EcclesiApp te ayuda a gestionar canciones, servicios y presentaciones de forma profesional.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <h3 className="font-bold mb-2">📚 Gestiona Canciones</h3>
            <p className="text-sm">Organiza tu biblioteca de alabanzas e himnos</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <h3 className="font-bold mb-2">🎬 Proyecta en Vivo</h3>
            <p className="text-sm">Muestra letras y versículos en pantalla</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-4">
            <h3 className="font-bold mb-2">📅 Planifica Servicios</h3>
            <p className="text-sm">Organiza tus cultos y eventos</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
