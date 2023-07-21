import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import Loading from '../loading/loading';
import { UserType } from '../../types';

function Profile() {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<UserType>();

  useEffect(() => {
    const userReturn = async () => {
      setLoading(true);
      const user = await getUser();
      setUserInfo(user);
      setLoading(false);
    };
    userReturn();
  }, []);

  return (
    <>
      { loading && <Loading /> }
      { !loading && (
        <div>
          <h2>Nome</h2>
          <p>{ userInfo?.name }</p>

          <h2>Email</h2>
          <p>{ userInfo?.email }</p>

          <h2>Descrição</h2>
          <p>{ userInfo?.description }</p>

          <img data-testid="profile-image" src={ userInfo?.image } alt="" />
          <Link to="/profile/edit">Editar perfil</Link>
        </div>
      ) }
    </>
  );
}

export default Profile;
