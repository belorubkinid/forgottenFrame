import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogout } from '../../redux/actions/player.actions';

function Navigation() {
  const { player: { session, playedGamesCount } } = useSelector((store) => store);
  const dispatch = useDispatch();
  const [ isWidescreen, setIsWidescreen ] = useState(true);
  const [ gamesCount ] = useState(+process.env.REACT_APP_GAMES_COUNT);
  const [ screenWidth ] = useState(window.innerWidth);

  useEffect(() => {
    screenWidth > 980 ? setIsWidescreen(true) : setIsWidescreen(false)
  }, [ screenWidth ]);

  return (
  <nav id="navigation">
    <div className="nav-wrapper">
      {isWidescreen ? <Link to='/'><div className="brand-logo center" alt='logo'></div></Link>
      : <Link to='/'><div className="brand-logo left" alt='logo'></div></Link>}
      <ul id="nav-mobile" className="right">
        {session ? <>
          {+playedGamesCount === gamesCount ? <li><Link to="/game" className="uk-active noLink">ИГРАТЬ</Link></li> :
          <li><Link to="/game" className="uk-active">ИГРАТЬ</Link></li>}
          <li><Link to="/rating" className="uk-active" >РЕЙТИНГ</Link></li>
          <li>
            <Link className="uk-active">
              <img src='door.png' alt='ВЫХОД' onClick={() => dispatch(startLogout())}></img>
            </Link>
          </li>
        </> : <> 
          <li><Link to="/registration" className="uk-active" >РЕГИСТРАЦИЯ</Link></li>
          <li><Link to="/login" className="uk-active">ВОЙТИ</Link></li>
        </>}
      </ul>
    </div>
  </nav>
  )
}

export default Navigation;
