import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import Loading from '../loading/loading';
import { UserType } from '../../types';
import './profile.css';

function Profile() {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<UserType>();
  const imageDefault = '/src/images/default_profile_image.png';
  useEffect(() => {
    const userReturn = async () => {
      setLoading(true);
      const user = await getUser();
      console.log(user);
      setUserInfo(user);
      setLoading(false);
    };
    userReturn();
  }, []);

  return (
    <>
      { loading && <Loading /> }
      { !loading && (
        <section className="profileInfos">
          <div className="profileImgDiv">
            <img
              className="profileImg"
              data-testid="profile-image"
              src={ userInfo?.image ? userInfo?.image : imageDefault }
              alt=""
            />
          </div>
          <div className="profileTextInfo">
            <h2>Nome</h2>
            <p>{ userInfo?.name }</p>

            <h2>Email</h2>
            <p>{ userInfo?.email }</p>

            <h2>Descrição</h2>
            <p>{ userInfo?.description }</p>
          </div>
          <div className="buttonDiv">
            <button className="editProfileBtn">
              <Link className="editProfileLink" to="/profile/edit">Editar perfil</Link>
            </button>
          </div>
        </section>
      ) }
    </>
  );
}

export default Profile;
