import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../loading/loading';
import getMusics from '../../services/musicsAPI';
import { AlbumType, SongType } from '../../types';
import emptyHeartImage from '../../images/empty_heart.png';
import checkedHeartImage from '../../images/checked_heart.png';

function Album() {
  const [loading, setLoading] = useState(false);
  const [musicData, setMusicData] = useState<(AlbumType | SongType)[]>([]);
  const [srcImage, setSrcImage] = useState(emptyHeartImage);

  const { id } = useParams();

  const handleFavorite = () => {
    if (srcImage === emptyHeartImage) {
      setSrcImage(checkedHeartImage);
    } else {
      setSrcImage(emptyHeartImage);
    }
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
            return (
              <div key={ (music as SongType).trackId }>

                <p>{ (music as SongType).trackName }</p>
                <audio
                  data-testid="audio-component"
                  src={ (music as SongType).previewUrl }
                  controls
                >
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  <code>audio</code>
                </audio>
                <label>
                  <img src={ srcImage } alt="Empty Heart" />
                  <input
                    onChange={ handleFavorite }
                    id="favoriteCheck"
                    type="checkbox"
                    data-testid={ `checkbox-music-${(music as SongType).trackId}` }
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
