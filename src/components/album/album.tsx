import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../loading/loading';
import getMusics from '../../services/musicsAPI';
import { AlbumType, SongType } from '../../types';

function Album() {
  const [loading, setLoading] = useState(false);
  const [musicData, setMusicData] = useState<(AlbumType | SongType)[]>([]);

  const { id } = useParams();

  const accessApi = async () => {
    setLoading(true);
    const data = await getMusics(id as string);
    setMusicData(data);
    console.log(data);
    setLoading(false);
  };

  useEffect(() => {
    accessApi();
  }, [id]);

  return (
    <>
      { loading && <Loading /> }
      { !loading && (
        <div>
          <img src={ musicData[0].artworkUrl100 } alt="" />
          <h2 data-testid="album-name">{ (music as AlbumType).collectionName }</h2>
          <h2 data-testid="artist-name">{ (music as AlbumType).artistName }</h2>
          { musicData.map((music) => {
            return (
              <div key={ (music as AlbumType).artistId }>
                <audio data-testid="audio-component" src="{previewUrl}" controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  { ' ' }
                  { ' ' }
                  <code>audio</code>
                  .
                </audio>
              </div>
            );
          }) }
        </div>
      ) }
    </>
  );
}

export default Album;
