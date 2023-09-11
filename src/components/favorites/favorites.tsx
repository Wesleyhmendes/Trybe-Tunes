import { useEffect, useState } from 'react';
import { getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';
import { AlbumType, SongType } from '../../types';
import Loading from '../loading/loading';
import MusicCard from '../MusicCard/MusicCard';
import './favorites.css';

function Favorites() {
  const [loading, setLoading] = useState(false);
  const [favSongs, setFavSongs] = useState<SongType[]>([]);

  useEffect(() => {
    const getFavSongs = async () => {
      setLoading(true);
      let getFav = await getFavoriteSongs();
      getFav = getFav.map((song) => ({ ...song, checked: true }));
      setFavSongs(getFav);
      console.log(getFav);
      setLoading(false);
    };
    getFavSongs();
  }, []);

  const handleFav = async (checked: boolean, trackId: number) => {
    const songToRemove = favSongs.find((song) => song.trackId === trackId);

    if (songToRemove) {
      setLoading(true);
      await removeSong(songToRemove);
      setLoading(false);
      setFavSongs((prevFavSongs) => prevFavSongs
        .filter((song) => song.trackId !== trackId));

      return favSongs.filter((song) => song.trackId !== trackId);
    }

    return favSongs;
  };

  return (
    <>
      { loading && <Loading /> }
      { !loading && (
        <div>
          <h2 className="favoritesPageTitle">Essas são suas músicas favoritas:</h2>
          { favSongs.map((song) => {
            const { trackId, trackName, previewUrl, checked } = song;
            return (
              <MusicCard
                key={ trackId }
                trackName={ trackName }
                previewUrl={ previewUrl }
                trackId={ trackId }
                checked={ checked }
                handleFav={ handleFav }
              />
            );
          }) }
        </div>
      ) }
    </>
  );
}

export default Favorites;
