import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

function HomePage() {
  const { player: { session, playedGamesCount } } = useSelector((store) => store);
  const [ gamesCount ] = useState(+process.env.REACT_APP_GAMES_COUNT);

  return (
    <div className="row conteiner">
      <table>
        <thead>
          <tr><th>Добро пожаловать в игру "Forgotten frame"</th></tr>
        </thead>
        <tbody>
          <tr><td>{`Отгадайте за ${gamesCount} попыток больше фильмов, чем другие игроки!`}</td></tr>
          <tr><td>Наш алгоритм всегда подбирает разные варианты ответов.</td></tr>
          <tr><td>Чтобы завершить игру необходимо дать все ответы.</td></tr>
          {(+playedGamesCount < gamesCount)
            &&
          (<tr className={styles.individualMessage}>
            <td>{`Вы еще не набрали индивидуальный рейтинг: доступно игр - ${gamesCount - playedGamesCount}!`}</td>
          </tr>)}
          {(+playedGamesCount === gamesCount)
            &&
          (<tr className={styles.individualMessage}>
            <td>Вы уже в рейтинге!</td>
          </tr>)}
          {!session
            &&
          (<tr className={styles.individualMessage}>
            <td>Пройдите регистрацию и попадите в рейтинг знатоков кино!</td>
          </tr>)}
        </tbody>
      </table>
      {(+playedGamesCount < gamesCount)
        &&
      session
        &&
      (<div className="row">
        <Link to="/game" className="btn-floating btn-large pulse">
          <i className="material-icons">Играть</i>
        </Link>
      </div>)}
    </div>
  )
}

export default HomePage;
