import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Error from '../Error/Error';
import { startRegistration } from '../../redux/actions/player.actions';
import { createError } from '../../redux/actions/error.action';

function Registration() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { player, error } = useSelector((store) => store);

  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  function passwordValidate(password, repeatPassword) {
    if (password === repeatPassword) return true;
    return false;
  }
  
  function handelForm(event) {
    event.preventDefault();
    if (!passwordValidate(password, repeatPassword)) {
      return dispatch(createError('Пароли не совпадают'));
    }
    const formData = new FormData(event.target);
    const registrationData = Object.fromEntries(formData);
    dispatch(startRegistration(registrationData));
  }
  
  useEffect(() => {
      if (player.session) navigate('/');
    }, [player, navigate]);

    
  return (
    <div className="row conteiner">
      <form className="col s12" onSubmit={handelForm}>
        <div className="row">
          <div className="input-field col s12">
            <label htmlFor="nickname">никнейм</label>
            <input className="validate" pattern="[a-zA-z, 0-9]{4,12}" type="text" id="nickname" name="nickname"
            title="Никнейм должен содержать от 4 до 12 латинских букв и цифр" required="required" />
            </div>
          <div className="input-field col s12">
            <label htmlFor="email">электронная почта</label>
            <input className="validate" type="text" id="email" name="email" required="required"
            title="Введите Ваш действующий адрес электронной почты" />
          </div>
          <div className="input-field col s12">
            <label htmlFor="password">пароль</label>
            <input className="validate" type="password" id="password" name="password" required="required"
            pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,16}" value={password}
            minLength="8" maxLength="16"
            title="Пароль должен быть от 8 до 16 символов длинной, содержать строчные и заглавные латинские буквы, цифры."
            onChange={({ target: { value } }) => setPassword(value)}/>
          </div>
          <div className="input-field col s12">
            <label htmlFor="password">повторите пароль</label>
            <input className="validate" type="password" required="required"
            pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,16}" value={repeatPassword}
            title="Пароль должен быть от 8 до 16 символов длинной, содержать строчные и заглавные латинские буквы, цифры."
            onChange={({ target: { value } }) => setRepeatPassword(value)}/>
          </div>
          <div className="input-field col s12">
          <input type="submit" className="waves-effect waves-light btn" value="зарегистрироваться" />
          </div>
        </div>
      </form>
      {error.message && <Error message={error.message} />}
    </div>
  )
}

export default Registration;
