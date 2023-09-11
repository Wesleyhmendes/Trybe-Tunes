import { useEffect, useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../../services/userAPI';
import { UserType } from '../../types';
import Loading from '../loading/loading';
import './editProfile.css';

function ProfileEdit() {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<UserType>({
    name: '',
    email: '',
    description: '',
    image: '',
  });
  const [disableBtn, setDisableBtn] = useState(true);

  const [nome, setNome] = useState(false);
  const [email, setEmail] = useState(false);
  const [descricao, setDescricao] = useState(false);
  const [url, setUrl] = useState(false);

  useEffect(() => {
    const checkFields = (user: UserType): void => {
      if (Object.values(user)
        .every((check) => check.length)) setDisableBtn(false);
    };
    const userReturn = async () => {
      setLoading(true);
      const user = await getUser();
      setLoading(false);
      setUserInfo(user);
      checkFields(user);
    };
    userReturn();
  }, []);

  const handleBtn = () => {
    if (nome && email && descricao && url) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    await updateUser({
      name: userInfo.name,
      email: userInfo.email,
      image: userInfo.image,
      description: userInfo.description,
    });
    navigate('/profile');
    setLoading(false);
  };

  useEffect(() => {
    handleBtn();
  }, [nome, email, descricao, url]);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const validateEmail = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
    const { name, value } = event.target;
    switch (name) {
      case 'nome':
        setNome(!!value);
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          name: value,
        }));
        break;
      case 'email':
        setEmail(validateEmail.test(value));
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          email: value,
        }));
        break;
      case 'descricao':
        setDescricao(!!value);
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          description: value,
        }));
        break;
      case 'url':
        setUrl(!!value);
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          image: value,
        }));
        break;
      default:
        break;
    }
  };

  return (
    <>
      { loading && <Loading /> }
      { !loading && (
        <form onSubmit={ handleSubmit }>
          <section className="editSection">
            <div className="editNome">
              <label>
                Nome:
                <input
                  className="nameEditInput"
                  name="nome"
                  onChange={ handleChange }
                  required
                  data-testid="edit-input-name"
                  type="text"
                  value={ userInfo.name }
                />
              </label>
            </div>
            <div className="editEmail">
              <label>
                Email:
                <input
                  className="emailEditInput"
                  name="email"
                  onChange={ handleChange }
                  required
                  data-testid="edit-input-email"
                  type="text"
                  value={ userInfo.email }
                />
              </label>
            </div>
            <div className="editDescription">
              <label>
                Descrição:
                <textarea
                  className="descriptionEditInput"
                  name="descricao"
                  onChange={ handleChange }
                  required
                  data-testid="edit-input-description"
                  value={ userInfo.description }
                />
              </label>
            </div>
            <div className="editUrl">
              <label>
                Url Imagem:
                <input
                  className="urlEditInput"
                  name="url"
                  onChange={ handleChange }
                  required
                  data-testid="edit-input-image"
                  type="text"
                  value={ userInfo.image }
                />
              </label>
            </div>
          </section>
          <div className="editSaveDivBtn">
            <button
              className="editSaveBtn"
              disabled={ disableBtn }
              data-testid="edit-button-save"
            >
              Enviar
            </button>
          </div>
        </form>
      ) }
    </>
  );
}

export default ProfileEdit;
