import { useDispatch, useSelector } from "react-redux";
import { startLogin } from "../../redux/actions/player.actions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Error from "../Error/Error";

function Login() {
  const { player, error } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (player.session) navigate('/');
  }, [player, navigate]);


  async function handelSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const loginData = Object.fromEntries(formData);
    dispatch(startLogin(loginData));
  }


  return (
    <div className="row conteiner">
      <form className="col s12" onSubmit={handelSubmit}>
        <div className="row">
          <div className="input-field col s12">
            <label htmlFor="email">электронная почта</label>
            <input className="validate" type="text" id="email" name="email" />
          </div>
          <div className="input-field col s12">
            <label htmlFor="password">пароль</label>
            <input className="validate" type="password" id="password" name="password"/>
          </div>
          <div className="input-field col s12">
            <input type="submit" className="waves-effect waves-light btn" value="войти" />
          </div>
        </div>
      </form>
      {error.message && <Error message={error.message} />}
  </div>
  )
}

export default Login;
