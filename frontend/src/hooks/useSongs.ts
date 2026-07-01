import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { Song, CreateSongDTO, UpdateSongDTO, SongFilter, SongListResponse } from '../types/song'
import { songService } from '../services/songService'

const SONGS_QUERY_KEY = 'songs'

export const useSongs = (filters?: SongFilter) => {
  return useQuery<SongListResponse>({
    queryKey: [SONGS_QUERY_KEY, filters],
    queryFn: () => songService.getAllSongs(filters),
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

export const useSongById = (id: string) => {
  return useQuery<Song>({
    queryKey: [SONGS_QUERY_KEY, id],
    queryFn: () => songService.getSongById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutos
  })
}

export const useCreateSong = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateSongDTO) => songService.createSong(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SONGS_QUERY_KEY] })
      toast.success('Canción creada exitosamente')
    },
    onError: () => {
      toast.error('Error al crear la canción')
    },
  })
}

export const useUpdateSong = (id: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateSongDTO) => songService.updateSong(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SONGS_QUERY_KEY] })
      queryClient.invalidateQueries({ queryKey: [SONGS_QUERY_KEY, id] })
      toast.success('Canción actualizada exitosamente')
    },
    onError: () => {
      toast.error('Error al actualizar la canción')
    },
  })
}

export const useDeleteSong = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => songService.deleteSong(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SONGS_QUERY_KEY] })
      toast.success('Canción eliminada exitosamente')
    },
    onError: () => {
      toast.error('Error al eliminar la canción')
    },
  })
}

export const useSearchSongs = (query: string) => {
  return useQuery<Song[]>({
    queryKey: ['songSearch', query],
    queryFn: () => songService.searchSongs(query),
    enabled: !!query && query.length > 2,
    staleTime: 3 * 60 * 1000, // 3 minutos
  })
}

export const useSongsByCategory = (category: string) => {
  return useQuery<Song[]>({
    queryKey: ['songsByCategory', category],
    queryFn: () => songService.getSongsByCategory(category),
    enabled: !!category,
    staleTime: 10 * 60 * 1000, // 10 minutos
  })
}

export const useAllTags = () => {
  return useQuery<string[]>({
    queryKey: ['allTags'],
    queryFn: () => songService.getAllTags(),
    staleTime: 30 * 60 * 1000, // 30 minutos
  })
}
