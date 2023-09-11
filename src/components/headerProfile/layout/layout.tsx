import { Outlet, useLocation } from 'react-router-dom';
import Header from '../../header/header';
import HeaderProfile from '../headerProfile';

function Layout() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';
  const isProfilePage = location.pathname === '/profile';

  return (
    <>
      {!isLoginPage && !isProfilePage && <Header />}
      {isProfilePage && <HeaderProfile />}
      <Outlet />
    </>
  );
}

export default Layout;
