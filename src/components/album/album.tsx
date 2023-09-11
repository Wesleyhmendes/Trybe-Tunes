import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../loading/loading';
import getMusics from '../../services/musicsAPI';
import { AlbumType, SongType } from '../../types';
import { addSong, getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';
import MusicCard from '../MusicCard/MusicCard';
import './album.css';

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
        <section className="albumMainDiv">
          <h2 className="albumPresentationTitle">
            Músicas do álbum
            { ' ' }
            <span className="albumPresentationName">
              { (musicData[0] as AlbumType).collectionName }
            </span>
          </h2>
          <div className="albumPageAlbumInfo">
            <div className="currentAlbumImage">
              <img
                className="albumPageImgAlbum"
                src={ (musicData[0] as AlbumType).artworkUrl100 }
                alt={ (musicData[0] as AlbumType).collectionName }
              />
            </div>
            <div className="albumPageTextInfo">
              <h2 className="albumPageArtistName" data-testid="artist-name">
                { (musicData[0] as AlbumType).artistName }
              </h2>
              <h2 className="albumPageAlbumName" data-testid="album-name">
                { (musicData[0] as AlbumType).collectionName }
              </h2>
            </div>
          </div>
          { musicData.map((music) => {
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
        </section>
      ) }
    </>
  );
}

export default Album;
