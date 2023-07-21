import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../../services/userAPI';
import { UserType } from '../../types';
import Loading from '../loading/loading';
import validateEmail from '../../utils/validadeEmail';

function ProfileEdit() {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<UserType>({
    name: '',
    email: '',
    description: '',
    image: '',
  });

  const validate = (userInfo
    .name.length > 0 && validateEmail(userInfo.email) && userInfo
    .description.length > 0 && userInfo.image.length > 0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setUserInfo(await getUser());
      setLoading(false);
    };
    fetchUser();
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setUserInfo(
      {
        ...userInfo,
        [name]: value,
      },
    );
  };

  const handleSubmit = async (
    event: ChangeEvent<HTMLInputElement> | FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setLoading(true);
    await updateUser(userInfo);
    setLoading(false);
    navigate('/profile');
  };

  return (
    <>
      { loading && <Loading /> }
      { !loading && (
        <form onSubmit={ (event) => handleSubmit(event) }>
          <label>
            Nome:
            <input
              name="name"
              onChange={ handleChange }
              required
              data-testid="edit-input-name"
              type="text"
              value={ userInfo.name }
            />
          </label>

          <label>
            Email:
            <input
              name="email"
              onChange={ handleChange }
              required
              data-testid="edit-input-email"
              type="text"
              value={ userInfo.email }
            />
          </label>

          <label>
            Descrição:
            <textarea
              name="description"
              onChange={ handleChange }
              required
              data-testid="edit-input-description"
              value={ userInfo.description }
            />
          </label>

          <label>
            Url Imagem:
            <input
              name="image"
              onChange={ handleChange }
              required
              data-testid="edit-input-image"
              type="text"
              value={ userInfo.image }
            />
          </label>

          <button
            disabled={ !validate }
            data-testid="edit-button-save"
          >
            Enviar
          </button>
        </form>
      ) }
    </>
  );
}

export default ProfileEdit;
