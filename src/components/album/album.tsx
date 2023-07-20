import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../loading/loading';
import getMusics from '../../services/musicsAPI';
import { AlbumType, SongType } from '../../types';
import MusicCard from '../MusicCard/MusiCard';
import { addSong, getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';

function Album() {
  const [loading, setLoading] = useState(false);
  const [musicData, setMusicData] = useState<(AlbumType | SongType)[]>([]);
  const [favoriteSongs, setFavoriteSongs] = useState<number[]>([]);

  const emptyHeartImage = '/src/images/empty_heart.png';
  const checkedHeartImage = '/src/images/checked_heart.png';

  const { id } = useParams();

  const handleFavorite = async (checked: boolean, trackId: number) => {
    setMusicData(musicData.map((music) => {
      if ((music as SongType).trackId === trackId) {
        if (!checked) {
          removeSong(music as SongType);
        } else if (checked) {
          addSong(music as SongType);
        }
        return { ...music, checked: !checked };
      }
      return music;
    }));
  };

  useEffect(() => {
    const accessApi = async () => {
      setLoading(true);
      const data = await getMusics(id as string);
      setMusicData(data);
      setLoading(false);
    };
    accessApi();
  }, [id]);

  useEffect(() => {
    const fetchFavoriteSongs = async () => {
      try {
        const songs = await getFavoriteSongs();
        const favoriteTrackIds = songs.map((song) => song.trackId);
        setFavoriteSongs(favoriteTrackIds);
      } catch (error) {
        console.error('Error fetching favorite songs:', error);
      }
    };

    fetchFavoriteSongs();
  }, []);

  return (
    <>
      { loading && <Loading /> }
      { !loading && musicData.length > 0 && (
        <div>
          <img
            src={ (musicData[0] as AlbumType).artworkUrl100 }
            alt={ (musicData[0] as AlbumType).collectionName }
          />
          <h2 data-testid="artist-name">
            { (musicData[0] as AlbumType).artistName }
          </h2>
          <h2 data-testid="album-name">
            { (musicData[0] as AlbumType).collectionName }
          </h2>
          { musicData.slice(1).map((music) => {
            const { trackId, trackName, previewUrl } = music as SongType;
            const checked = favoriteSongs.includes(trackId);
            return (
              <div key={ trackId }>

                <p>{ trackName }</p>
                <audio
                  data-testid="audio-component"
                  src={ previewUrl }
                  controls
                >
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  <code>audio</code>
                </audio>
                <label data-testid={ `checkbox-music-${trackId}` }>
                  <img
                    src={ checked ? checkedHeartImage : emptyHeartImage }
                    alt="favorite"
                  />
                  <input
                    onChange={ ({ target }) => handleFavorite(target.checked, trackId) }
                    id="favoriteCheck"
                    type="checkbox"
                    checked={ checked }
                  />
                </label>
              </div>
            );
          }) }
        </div>
      ) }
    </>
  );
}

export default Album;
