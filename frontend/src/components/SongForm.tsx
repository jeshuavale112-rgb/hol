import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { CreateSongDTO, SongCategory } from '../types/song'
import { useCreateSong } from '../hooks/useSongs'
import toast from 'react-hot-toast'

const songSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  artist: z.string().min(1, 'El artista es requerido'),
  album: z.string().optional(),
  lyrics: z.string().min(1, 'Las letras son requeridas'),
  chords: z.string().optional(),
  category: z.enum(Object.values(SongCategory) as [string, ...string[]]),
  tags: z.string().transform((val) => val.split(',').map((t) => t.trim()).filter(Boolean)),
  duration: z.string().optional().transform((val) => (val ? parseInt(val) : undefined)),
  key: z.string().optional(),
  tempo: z.string().optional().transform((val) => (val ? parseInt(val) : undefined)),
})

type SongFormData = z.infer<typeof songSchema>

interface SongFormProps {
  onSuccess?: () => void
}

function SongForm({ onSuccess }: SongFormProps) {
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const createMutation = useCreateSong()

  const { register, handleSubmit, formState: { errors }, reset } = useForm<SongFormData>({
    resolver: zodResolver(songSchema),
    defaultValues: {
      category: SongCategory.OTHER,
    },
  })

  const onSubmit = async (data: SongFormData) => {
    try {
      await createMutation.mutateAsync({
        ...data,
        cover: coverFile || undefined,
      } as CreateSongDTO)
      reset()
      setCoverFile(null)
      onSuccess?.()
    } catch (error) {
      toast.error('Error al crear la canción')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Título *
          </label>
          <input
            {...register('title')}
            type="text"
            placeholder="Título de la canción"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Artista *
          </label>
          <input
            {...register('artist')}
            type="text"
            placeholder="Artista o compositor"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          />
          {errors.artist && <p className="text-red-500 text-sm mt-1">{errors.artist.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Álbum
          </label>
          <input
            {...register('album')}
            type="text"
            placeholder="Álbum (opcional)"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Categoría *
          </label>
          <select
            {...register('category')}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          >
            {Object.values(SongCategory).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Letras *
        </label>
        <textarea
          {...register('lyrics')}
          placeholder="Escribe las letras de la canción aquí..."
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
        />
        {errors.lyrics && <p className="text-red-500 text-sm mt-1">{errors.lyrics.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Acordes (opcional)
        </label>
        <textarea
          {...register('chords')}
          placeholder="Acordes de la canción..."
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tonalidad
          </label>
          <input
            {...register('key')}
            type="text"
            placeholder="ej: Do Mayor"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tempo (BPM)
          </label>
          <input
            {...register('tempo')}
            type="number"
            placeholder="ej: 120"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Etiquetas
        </label>
        <input
          {...register('tags')}
          type="text"
          placeholder="etiqueta1, etiqueta2, etiqueta3"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={createMutation.isPending}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2 rounded-lg transition"
        >
          {createMutation.isPending ? 'Creando...' : 'Crear Canción'}
        </button>
      </div>
    </form>
  )
}

export default SongForm
