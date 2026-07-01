import React, { useState } from 'react'
import { Song } from '../types/song'
import SongCard from './SongCard'
import SongDetail from './SongDetail'

interface SongListProps {
  songs: Song[]
}

function SongList({ songs }: SongListProps) {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {songs.map((song) => (
          <SongCard
            key={song.id}
            song={song}
            onClick={() => setSelectedSong(song)}
          />
        ))}
      </div>

      {/* Song Detail Modal */}
      {selectedSong && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <SongDetail
              song={selectedSong}
              onClose={() => setSelectedSong(null)}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default SongList
