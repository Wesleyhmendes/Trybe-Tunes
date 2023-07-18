import { useState } from 'react';

function Search() {
  const [disableSearchBtn, setdisableSearchBtn] = useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.length >= 2) {
      setdisableSearchBtn(false);
    } else {
      setdisableSearchBtn(true);
    }
  };
  return (
    <form>
      <label>
        <input
          data-testid="search-artist-input"
          type="text"
          placeholder="Nome do Artista"
          onChange={ handleChange }
        />
        <button
          disabled={ disableSearchBtn }
          data-testid="search-artist-button"
        >
          Pesquisar
        </button>
      </label>
    </form>
  );
}

export default Search;
