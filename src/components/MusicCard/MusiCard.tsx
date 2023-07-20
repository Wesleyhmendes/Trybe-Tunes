import { useState } from 'react';
import { SongType } from '../../types';

function MusicCard(music: SongType &
{ handleFavorite: (checked: boolean, trackId: number) => void }) {
  const [checked, setChecked] = useState(false);
  const { trackId, trackName, previewUrl } = music;

  const emptyHeartImage = '/src/images/empty_heart.png';
  const checkedHeartImage = '/src/images/checked_heart.png';

  const handleFavorite = () => {
    setChecked((prevChecked) => !prevChecked);
  };

  return (
    <div>
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
            onChange={ handleFavorite }
            id="favoriteCheck"
            type="checkbox"
            checked={ checked }
          />
        </label>
      </div>
    </div>
  );
}

export default MusicCard;
