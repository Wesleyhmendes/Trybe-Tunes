import React from 'react';
import { SongType } from '../../types';
import { addSong, removeSong } from '../../services/favoriteSongsAPI';

const emptyHeartImage = '/src/images/empty_heart.png';
const checkedHeartImage = '/src/images/checked_heart.png';

function MusicCard({ trackName, previewUrl, trackId, checked, handleFav }: SongType) {
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
          onChange={ ({ target }) => handleFav(target.checked, trackId) }
          id="favoriteCheck"
          type="checkbox"
          checked={ checked }
        />
      </label>
    </div>
  );
}

export default MusicCard;
