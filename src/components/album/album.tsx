import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../loading/loading';
import getMusics from '../../services/musicsAPI';
import { AlbumType, SongType } from '../../types';
import MusicCard from '../MusicCard/MusiCard';
import { addSong, removeSong } from '../../services/favoriteSongsAPI';

function Album() {
  const [loading, setLoading] = useState(false);
  const [musicData, setMusicData] = useState<(AlbumType | SongType)[]>([]);
  const [srcImage, setSrcImage] = useState('/src/images/empty_heart.png');

  const emptyHeartImage = '/src/images/empty_heart.png';
  const checkedHeartImage = '/src/images/checked_heart.png';

  const { id } = useParams();

  const handleFavorite = (checked: boolean, trackId: number) => {
    setMusicData(musicData.map((music) => {
      if ((music as SongType).trackId === trackId) {
        if (!checked) {
          removeSong(music as SongType);
          console.log('foi remove song');
        } else if (checked) {
          addSong(music as SongType);
          console.log('foi add song');
        }
        return { ...music, checked };
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
            const { trackId, trackName, previewUrl, checked } = music as SongType;
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
                    alt="Empty Heart"
                  />
                  <input
                    onChange={ ({ target }) => handleFavorite(target.checked, trackId) }
                    id="favoriteCheck"
                    type="checkbox"
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
