import { useEffect, useState } from 'react';
import { getFavoriteSongs } from '../../services/favoriteSongsAPI';
import { SongType } from '../../types';

function Favorites() {
  const [favSongs, setFavSongs] = useState();

  useEffect(() => {
    const getFavSongs = async () => {
      const getFav = await getFavoriteSongs();
      // setFavSongs(getFav);
    };
  });

  return (
    <p>Olá</p>
  );
}

export default Favorites;
