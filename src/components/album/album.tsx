import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../loading/loading';
import getMusics from '../../services/musicsAPI';
import { AlbumType, SongType } from '../../types';
import { addSong, getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';
import MusicCard from '../MusicCard/MusicCard';

function Album() {
  const [loading, setLoading] = useState(false);
  const [musicData, setMusicData] = useState<(AlbumType | SongType)[]>([]);

  const { id } = useParams();

  useEffect(() => {
    const accessApi = async () => {
      setLoading(true);
      const data = await getMusics(id as string);
      const songs = await getFavoriteSongs();
      const filterMusic = data.map((music) => ({
        ...music,
        checked: songs.some((song) => song.trackId === (music as SongType).trackId),
      }));
      setMusicData(filterMusic);
      setLoading(false);
    };
    accessApi();
  }, [id]);

  const handleFav = (checked: boolean, trackId: number) => {
    setMusicData(musicData.map((music) => {
      if ((music as SongType).trackId === trackId) {
        if (!checked) {
          removeSong(music as SongType);
        } else if (checked) {
          addSong(music as SongType);
        }
        return { ...music, checked };
      }
      return music;
    }));
  };

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
            if ('trackId' in music) {
              const { trackId, trackName, previewUrl, checked } = music;
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
            }
            return null;
          }) }
        </div>
      ) }
    </>
  );
}

export default Album;
