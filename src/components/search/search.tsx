import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import Loading from '../loading/loading';
import { AlbumType } from '../../types';
import './search.css';

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
              className="searchInput"
              name="searchArtisInput"
              type="text"
              placeholder="🔎 Nome do Artista"
              onInput={ handleChange }
              value={ inputSearch }
              data-testid="search-artist-input"
            />
            <button
              className="searchButton"
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
          <h2 className="h2Result">
            Resultado de álbuns de:
            { ' ' }
            <span className="artistName">
              { searchArtistValue }
            </span>
          </h2>
          { apiResult.map((result: AlbumType) => (
            <Link
              className="linkAlbum"
              data-testid={ `link-to-album-${result.collectionId}` }
              to={ `/album/${result.collectionId}` }
              key={ result.collectionId }
            >
              <img className="albumImg" src={ result.artworkUrl100 } alt="" />
              <div className="albumInfo">
                <p className="albumArtist">{ result.collectionName }</p>
                <p className="albumName">{ result.artistName }</p>
              </div>
            </Link>
          )) }
        </>
      ) }
    </>
  );
}

export default Search;
