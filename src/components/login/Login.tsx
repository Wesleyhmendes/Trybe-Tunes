import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/userAPI';
import Loading from '../loading/loading';

function Login() {
  const [loading, setLoading] = useState(false);
  const [disableBtn, setdisableBtn] = useState(true);
  const [createParam, setCreateParam] = useState({
    name: '',
    email: '',
    image: '',
    description: '',
  });
  const navigate = useNavigate();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCreateParam((prevCreateParam) => ({ ...prevCreateParam, name: value }));
    if (value.length >= 3) {
      setdisableBtn(false);
    } else {
      setdisableBtn(true);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    await createUser(createParam);
    navigate('/search');
    setLoading(false);
  };

  return (
    <>
      { loading && <Loading /> }
      { !loading && (
        <form>
          <label>
            Nome
            <input
              required
              type="text"
              name="NameInput"
              data-testid="login-name-input"
              onChange={ handleChange }
            />
          </label>
          <button
            name="createBtn"
            type="button"
            disabled={ disableBtn }
            data-testid="login-submit-button"
            onClick={ handleSubmit }
          >
            Entrar
          </button>
        </form>
      ) }
    </>
  );
}

export default Login;
