import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUser } from '../../services/userAPI';
import Loading from '../loading/loading';

function Header() {
  const [loading, setLoading] = useState(false);
  const [getName, setGetName] = useState<string>();

  const getUsers = async () => {
    setLoading(true);
    const data = await getUser();
    setGetName(data.name);
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      { loading && <Loading />}
      { !loading && (
        <header data-testid="header-component">
          <nav>
            <NavLink to="/search" data-testid="link-to-search">Search</NavLink>
            <NavLink to="/favorites" data-testid="link-to-favorites">Favorites</NavLink>
            <NavLink to="/profile" data-testid="link-to-profile">Profile</NavLink>
          </nav>
          <h4 data-testid="header-user-name">{ getName }</h4>
        </header>
      )}
    </>
  );
}

export default Header;
