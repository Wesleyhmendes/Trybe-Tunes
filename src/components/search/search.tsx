import { useState } from 'react';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import Loading from '../loading/loading';

function Search() {
  const [loading, setLoading] = useState(false);
  const [disableSearchBtn, setdisableSearchBtn] = useState(true);
  const [searchArtistValue, setsearchArtistValue] = useState('');
  const [inputSearch, setinputSearch] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setinputSearch(value);
    if (value.length >= 2) {
      setdisableSearchBtn(false);
    } else {
      setdisableSearchBtn(true);
    }
  };

  const handleSearch = () => {
    setsearchArtistValue(inputSearch);
    setinputSearch('');
    setdisableSearchBtn(true);
    setLoading(true);
    const getAlbums = async () => {
      await searchAlbumsAPI(searchArtistValue);
      setLoading(false);
    };
  };

  return (
    <>
      { loading && <Loading /> }
      { !loading && (
        <form>
          <label>
            <input
              name="searchArtisInput"
              type="text"
              placeholder="Nome do Artista"
              onInput={ handleChange }
              value={ inputSearch }
              data-testid="search-artist-input"
            />
            <button
              name="searchArtistBtn"
              onClick={ handleSearch }
              disabled={ disableSearchBtn }
              data-testid="search-artist-button"
            >
              Pesquisar
            </button>
          </label>
        </form>
      ) }
    </>
  );
}

export default Search;
