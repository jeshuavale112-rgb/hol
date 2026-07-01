import React, { useState } from 'react'
import { Plus, Search, Filter, Music } from 'lucide-react'
import { useSongs } from '../hooks/useSongs'
import { SongFilter, SongCategory } from '../types/song'
import SongCard from '../components/SongCard'
import SongForm from '../components/SongForm'
import SongList from '../components/SongList'

function Songs() {
  const [showForm, setShowForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<SongCategory | ''>('')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(20)

  const filter: SongFilter = {
    search: searchQuery || undefined,
    category: selectedCategory ? (selectedCategory as SongCategory) : undefined,
    page,
    limit,
    sortBy: 'title',
    sortOrder: 'asc',
  }

  const { data, isLoading, error } = useSongs(filter)

  const categories = Object.values(SongCategory)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Music className="w-8 h-8" />
            Canciones
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Administra tu biblioteca de canciones y alabanzas
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          <Plus className="w-5 h-5" />
          Nueva Canción
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-4">
        <div className="flex gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar canciones por título o artista..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setPage(1)
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value as SongCategory | '')
                setPage(1)
              }}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
            >
              <option value="">Todas las categorías</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 border-b dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Nueva Canción</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>
            <div className="p-4">
              <SongForm onSuccess={() => setShowForm(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Contenido */}
      <div>
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 dark:text-gray-300 mt-4">Cargando canciones...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900 p-4 rounded-lg text-red-800 dark:text-red-200">
            Error al cargar las canciones. Por favor, intenta de nuevo.
          </div>
        ) : data && data.data.length > 0 ? (
          <>
            <SongList songs={data.data} />
            {/* Paginación */}
            <div className="mt-6 flex justify-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 dark:text-white"
              >
                Anterior
              </button>
              <span className="px-4 py-2 dark:text-white">
                Página {page} de {data.totalPages}
              </span>
              <button
                disabled={page === data.totalPages}
                onClick={() => setPage(page + 1)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 dark:text-white"
              >
                Siguiente
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <Music className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-300 text-lg">No hay canciones aún</p>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Crea una nueva canción para comenzar</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
            >
              Crear Canción
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Songs
