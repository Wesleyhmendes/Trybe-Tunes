import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../loading/loading';
import getMusics from '../../services/musicsAPI';
import { AlbumType, SongType } from '../../types';
import MusicCard from '../MusicCard/MusiCard';

function Album() {
  const [loading, setLoading] = useState(false);
  const [musicData, setMusicData] = useState<(AlbumType | SongType)[]>([]);

  const { id } = useParams();

  const handleFavorite = (checked: boolean, trackId: number) => {
    setMusicData(musicData.map((music) => {
      if ((music as SongType).trackId === trackId) {
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
          { musicData.slice(1).map((music) => (
            <MusicCard
              key={ (music as SongType).trackId }
              trackId={ (music as SongType).trackId }
              trackName={ (music as SongType).trackName }
              previewUrl={ (music as SongType).previewUrl }
              checked={ (music as SongType).checked }
              handleFavorite={ handleFavorite }
            />
          )) }
        </div>
      ) }
    </>
  );
}

export default Album;
