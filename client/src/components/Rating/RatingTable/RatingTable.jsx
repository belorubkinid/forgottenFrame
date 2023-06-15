import styles from './style.module.css';

function RatingTable({ rating, nickname }) {
  return (
  <table className="ratingTable">
    <thead>
      <tr><th>Рейтинг</th><th>Никнейм</th><th>Игр</th></tr>
    </thead>
    <tbody>
    {rating.map((player, index) => {
      if (player.nickname === nickname) {
        return <tr className={styles.tableCertainPlayer} key={index}>
          <td>{player.rating}</td><td>{player.nickname}</td><td>{player.gamesCount}</td>
          </tr>  
      }
      return <tr key={index}>
        <td>{player.rating}</td><td>{player.nickname}</td><td>{player.gamesCount}</td>
        </tr>
    })}
    </tbody>
  </table>
  )
}

export default RatingTable;
