import { create } from 'zustand'
import { Song, SongFilter } from '../types/song'

interface SongState {
  // Estado
  songs: Song[]
  selectedSong: Song | null
  currentFilter: SongFilter
  isLoading: boolean
  error: string | null

  // Acciones
  setSongs: (songs: Song[]) => void
  addSong: (song: Song) => void
  updateSong: (id: string, song: Song) => void
  removeSong: (id: string) => void
  setSelectedSong: (song: Song | null) => void
  setCurrentFilter: (filter: SongFilter) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearSongs: () => void
}

export const useSongStore = create<SongState>((set) => ({
  // Estado inicial
  songs: [],
  selectedSong: null,
  currentFilter: {
    page: 1,
    limit: 20,
    sortBy: 'title',
    sortOrder: 'asc',
  },
  isLoading: false,
  error: null,

  // Acciones
  setSongs: (songs) => set({ songs }),
  addSong: (song) => set((state) => ({ songs: [...state.songs, song] })),
  updateSong: (id, song) =>
    set((state) => ({
      songs: state.songs.map((s) => (s.id === id ? song : s)),
      selectedSong: state.selectedSong?.id === id ? song : state.selectedSong,
    })),
  removeSong: (id) =>
    set((state) => ({
      songs: state.songs.filter((s) => s.id !== id),
      selectedSong: state.selectedSong?.id === id ? null : state.selectedSong,
    })),
  setSelectedSong: (song) => set({ selectedSong: song }),
  setCurrentFilter: (filter) => set({ currentFilter: filter }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  clearSongs: () =>
    set({
      songs: [],
      selectedSong: null,
      error: null,
    }),
}))
