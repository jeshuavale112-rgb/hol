import React from 'react'
import { Song } from '../types/song'
import { Music, Edit, Trash2 } from 'lucide-react'
import { useDeleteSong } from '../hooks/useSongs'
import toast from 'react-hot-toast'

interface SongCardProps {
  song: Song
  onClick?: () => void
}

function SongCard({ song, onClick }: SongCardProps) {
  const deleteMutation = useDeleteSong()

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (window.confirm('¿Estás seguro de que deseas eliminar esta canción?')) {
      deleteMutation.mutate(song.id)
    }
  }

  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition cursor-pointer overflow-hidden"
    >
      {/* Cover */}
      <div className="aspect-square bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center relative overflow-hidden">
        {song.cover ? (
          <img
            src={song.cover}
            alt={song.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <Music className="w-12 h-12 text-white opacity-50" />
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-bold text-gray-900 dark:text-white truncate">{song.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{song.artist}</p>
        <div className="flex gap-2 mt-3">
          <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-1 rounded">
            {song.category}
          </span>
          {song.key && (
            <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 px-2 py-1 rounded">
              {song.key}
            </span>
          )}
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={(e) => {
              e.stopPropagation()
              // TODO: Open edit form
            }}
            className="flex-1 flex items-center justify-center gap-1 text-blue-600 hover:text-blue-700 py-2 text-sm"
          >
            <Edit className="w-4 h-4" />
            Editar
          </button>
          <button
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="flex-1 flex items-center justify-center gap-1 text-red-600 hover:text-red-700 py-2 text-sm disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4" />
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}

export default SongCard
