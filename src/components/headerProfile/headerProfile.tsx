import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUser } from '../../services/userAPI';
import Loading from '../loading/loading';
import '../header/header.css';

function HeaderProfile() {
  const [loading, setLoading] = useState(false);
  const [getName, setGetName] = useState<string>();

  const getUsers = async () => {
    setLoading(true);
    const data = await getUser();
    setGetName(data.name.charAt(0).toUpperCase() + data.name.slice(1).toLowerCase());
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      { loading && <Loading /> }
      { !loading && (
        <header data-testid="header-component">
          <nav className="headerNav">
            <NavLink className="headerLink" to="/search" data-testid="link-to-search">
              Search
            </NavLink>
            <NavLink
              className="headerLink"
              to="/favorites"
              data-testid="link-to-favorites"
            >
              Favorites
            </NavLink>
            <NavLink className="headerLink" to="/profile" data-testid="link-to-profile">
              Profile
            </NavLink>
          </nav>
          <h4
            className="userName"
            data-testid="header-user-name"
          >
            Informações de
            {' '}
            <span className="getName">
              { getName }
            </span>
            !
          </h4>
        </header>
      ) }
    </>
  );
}

export default HeaderProfile;
