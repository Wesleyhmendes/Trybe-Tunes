import { Route, Routes } from 'react-router-dom';
import NotFound from './components/notFound/notFound';
import Search from './components/search/search';
import Login from './components/login/Login';
import Album from './components/album/album';
import Layout from './components/headerProfile/layout/layout';
import Favorites from './components/favorites/favorites';
import ProfileEdit from './components/editProfile/ProfileEdit';
import Profile from './components/profile/profile';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Layout /> }>
        <Route index element={ <Login /> } />
        <Route path="/search" element={ <Search /> } />
        <Route path="/album/:id" element={ <Album /> } />
        <Route path="/favorites" element={ <Favorites /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/profile/edit" element={ <ProfileEdit /> } />
      </Route>
      <Route path="*" element={ <NotFound /> } />
    </Routes>
  );
}

export default App;
