import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import Loading from '../loading/loading';
import { AlbumType } from '../../types';

function Search() {
  const [loading, setLoading] = useState(false);
  const [disableSearchBtn, setdisableSearchBtn] = useState(true);
  const [searchArtistValue, setSearchArtistValue] = useState('');
  const [inputSearch, setinputSearch] = useState('');
  const [showArtist, setshowArtist] = useState<boolean>(false);
  const [apiResult, setApiResult] = useState<AlbumType[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setinputSearch(value);
    if (value.length >= 2) {
      setdisableSearchBtn(false);
    } else {
      setdisableSearchBtn(true);
    }
  };

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchArtistValue(inputSearch);
    setinputSearch('');
    setdisableSearchBtn(true);
    setLoading(true);
  };

  useEffect(() => {
    const searchArtist = async () => {
      if (searchArtistValue !== '') {
        const getApi = await searchAlbumsAPI(searchArtistValue);
        setApiResult(getApi);
        setLoading(false);
        setshowArtist(true);
      }
    };
    searchArtist();
  }, [searchArtistValue]);

  return (
    <>
      { loading && <Loading /> }
      { !loading && (
        <form onSubmit={ handleSearch }>
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
              type="submit"
              name="searchArtistBtn"
              disabled={ disableSearchBtn }
              data-testid="search-artist-button"
            >
              Pesquisar
            </button>
          </label>
        </form>
      ) }
      { showArtist && apiResult.length === 0 && <h2>Nenhum álbum foi encontrado</h2> }
      { showArtist && apiResult.length !== 0 && (
        <>
          <h2>
            Resultado de álbuns de:
            { ' ' }
            { searchArtistValue }
          </h2>
          { apiResult.map((result: AlbumType) => (
            <Link
              data-testid={ `link-to-album-${result.collectionId}` }
              to={ `/album/${result.collectionId}` }
              key={ result.collectionId }
            >
              <img src={ result.artworkUrl100 } alt="" />
              <p>{result.collectionName}</p>
              <p>{ result.artistName }</p>
            </Link>
          )) }
        </>
      ) }
    </>
  );
}

export default Search;
