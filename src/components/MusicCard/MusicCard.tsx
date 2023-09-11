import React from 'react';
import { SongType } from '../../types';
import './musicCard.css';

const emptyHeartImage = '/src/images/empty_heart.png';
const checkedHeartImage = '/src/images/checked_heart.png';

function MusicCard({ trackName, previewUrl, trackId, checked, handleFav }: SongType) {
  return (
    <div key={ trackId }>

      <p className="trackName">{ trackName }</p>
      <div className="audioAndCheckedHeart">
        <audio
          className="audioPlayer"
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
            className="checkedHeartAlbumPage"
            src={ checked ? checkedHeartImage : emptyHeartImage }
            alt="favorite"
          />
          <input
            className="checkInputFavorite"
            onChange={ ({ target }) => handleFav(target.checked, trackId) }
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
