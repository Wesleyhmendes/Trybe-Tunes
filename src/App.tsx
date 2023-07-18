import { Route, Routes } from 'react-router-dom';
import NotFound from './components/notFound/notFound';
import Search from './components/search/search';
import Login from './components/login/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/search" element={ <Search /> } />
      <Route path="*" element={ <NotFound /> } />
    </Routes>
  );
}

export default App;
