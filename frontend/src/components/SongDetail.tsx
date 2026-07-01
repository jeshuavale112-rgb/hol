import React from 'react'
import { Song } from '../types/song'
import { X, Copy, Share2 } from 'lucide-react'
import toast from 'react-hot-toast'

interface SongDetailProps {
  song: Song
  onClose: () => void
}

function SongDetail({ song, onClose }: SongDetailProps) {
  const handleCopyLyrics = () => {
    navigator.clipboard.writeText(song.lyrics)
    toast.success('Letras copiadas al portapapeles')
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="sticky top-0 bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-4 flex justify-between items-start">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{song.title}</h2>
          <p className="text-gray-600 dark:text-gray-400">{song.artist}</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Metadata */}
        <div className="grid grid-cols-2 gap-4">
          {song.album && (
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">Álbum</label>
              <p className="font-medium text-gray-900 dark:text-white">{song.album}</p>
            </div>
          )}
          {song.key && (
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">Tonalidad</label>
              <p className="font-medium text-gray-900 dark:text-white">{song.key}</p>
            </div>
          )}
          {song.tempo && (
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">Tempo</label>
              <p className="font-medium text-gray-900 dark:text-white">{song.tempo} BPM</p>
            </div>
          )}
          {song.duration && (
            <div>
              <label className="text-sm text-gray-600 dark:text-gray-400">Duración</label>
              <p className="font-medium text-gray-900 dark:text-white">
                {Math.floor(song.duration / 60)}:{String(song.duration % 60).padStart(2, '0')}
              </p>
            </div>
          )}
        </div>

        {/* Tags */}
        {song.tags.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Etiquetas</label>
            <div className="flex flex-wrap gap-2">
              {song.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Lyrics */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Letras</label>
            <button
              onClick={handleCopyLyrics}
              className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm"
            >
              <Copy className="w-4 h-4" />
              Copiar
            </button>
          </div>
          <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200 font-mono">
            {song.lyrics}
          </pre>
        </div>

        {/* Chords */}
        {song.chords && (
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Acordes</label>
            <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200 font-mono">
              {song.chords}
            </pre>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t dark:border-gray-700 p-4 flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
          <Share2 className="w-4 h-4" />
          Compartir
        </button>
        <button
          onClick={onClose}
          className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 py-2 rounded-lg transition"
        >
          Cerrar
        </button>
      </div>
    </div>
  )
}

export default SongDetail
