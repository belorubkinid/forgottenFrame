import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { resetPlayerRating, startUpdatePlayerRating } from "../../redux/actions/player.actions";

function GameResults() {
  const { movies, player: { rating, playedGamesCount } } = useSelector((store) => store);
  const dispatch = useDispatch();
  const [ moviesCount ] = useState(movies.length);

  useEffect(() => {
    dispatch(startUpdatePlayerRating(rating));

    return function() {
      dispatch(resetPlayerRating());
    }
  }, [dispatch, rating]);

  return (
    <div className="row conteiner">
      <div className="row">
        <h3>{`Ваш результат ${rating} из ${moviesCount}`}</h3>
        {+playedGamesCount === 11
          ?
        (<Link to="/rating" className="btn-floating btn-large pulse"><i className="material-icons">Рейтинг</i></Link>)
          :
        (<Link to="/game" className="btn-floating btn-large pulse"><i className="material-icons">Продолжить</i></Link>)}
      </div>
    </div>
  );
}

export default GameResults;
