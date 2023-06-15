import { useDispatch, useSelector} from "react-redux";
import { useEffect, useState } from "react";
import FrameCard from "./FrameCard/FrameCard";
import AnswersCard from "./AnswersCard/AnswersCard";
import ProgressBar from "./Progressbar/Progressbar";
import LoadingCard from "../LoadingCard/LoadingCard";
import { startInitMovies } from "../../redux/actions/movies.action";
import { startLoading } from "../../redux/actions/loading.action";
import { useNavigate } from "react-router-dom";
import { startInitPlayedGames } from "../../redux/actions/player.actions";

function Game() {
  const { movies, loading } = useSelector((store) => store);
  const dispatch = useDispatch();
  const [ counter, setCounter ] = useState(0);
  const [ preCounter, setPreCounter ] = useState(0);
  const [ moviesCount ] = useState(+process.env.REACT_APP_MOVIES_COUNT_IN_GAME);
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(startLoading());
    dispatch(startInitMovies());

    return function() {
      dispatch(startInitPlayedGames());
    }
  }, [dispatch]);

  useEffect(() => {
    if (moviesCount === preCounter) {
      navigate('/game/results');
    }
  }, [navigate, dispatch, moviesCount, preCounter ] )

  return (
    <div className="row gameConteiner">
      <div className="col s12 m12">
        {loading.status
          ?
        <LoadingCard message={'Алгоритм формирует для Вас игру'}/>
          :
        <>
          <FrameCard frame={movies[counter]?.frame}/>
          <AnswersCard movie={movies[counter]} setCounter={setCounter} setPreCounter={setPreCounter}/>
          <ProgressBar progress={Math.round(counter / movies.length * 100)}/>
        </>}
      </div>
    </div>
  );
}

export default Game;
