import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { startInitSession } from './redux/actions/player.actions';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './components/HomePage/HomePage';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import GameCard from './components/GameCard/GameCard';
import sessionAccesserHelper from './helpers/sessionAccesser.helper';
import GameResults from './components/GameResults/GameResults';
import Rating from './components/Rating/Rating';

function App() {
  const { player: { session } } = useSelector((store) => store);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startInitSession());
  }, [dispatch]);

  return (
    <>
    <header>
      <Header />
    </header>
    <main>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/registration' element={sessionAccesserHelper(<Registration />, !session)}/>
        <Route path='/login' element={sessionAccesserHelper(<Login />, !session)}/>
        <Route path='/game' element={sessionAccesserHelper(<GameCard />, session)}></Route>
        <Route path='/game/results' element={sessionAccesserHelper(<GameResults />, session)}></Route>
        <Route path='/rating' element={sessionAccesserHelper(<Rating />, session)}></Route>
      </Routes>
    </main>
    <footer>
      <Footer />
    </footer>
    </>
  );
}

export default App;
