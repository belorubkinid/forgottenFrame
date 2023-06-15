import { useRef, useState } from "react";  
import { useDispatch } from "react-redux";
import { initPlayerRating } from "../../../redux/actions/player.actions";
import styles from './style.module.css';

function AnswersCard({ movie, setCounter, setPreCounter }) {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const [ counterDelay ] = useState(+process.env.REACT_APP_COUNTER_DELAY);
  const [ preCounterDelay ] = useState(+process.env.REACT_APP_PRE_COUNTER_DELAY);
  const [rightAnswersCount, setRightAnswersCount] = useState(1);

  function checkAnswer(answerTitle) {
    ref.current.childNodes.forEach((item) => {
      item.classList.remove(styles.hovering);
      if (answerTitle === movie.title && item.textContent === movie.title) {
        item.classList.add(styles.rightAnswer);
        setRightAnswersCount((rightAnswersCount) => rightAnswersCount + 1);
        dispatch(initPlayerRating(rightAnswersCount));
      } else {
          if (item.textContent === movie.title) item.classList.add(styles.rightAnswer);
          if (item.textContent === answerTitle) item.classList.add(styles.wrongAnswer);
      }
      if (item.textContent !== answerTitle) item.classList.add(styles.otherAnswer);
    });

      setTimeout(() => {
        setPreCounter((preCounter) => preCounter + 1);
      }, preCounterDelay);

      setTimeout(() => {
        ref.current?.childNodes.forEach((item) => {
          item.classList.remove(styles.rightAnswer);
          item.classList.remove(styles.wrongAnswer);
          item.classList.remove(styles.otherAnswer);
          item.classList.add(styles.hovering);
        });
        setCounter((counter) => counter + 1);
      }, counterDelay);
  }

  return (
      <div ref={ref} className="card-action">
        {movie?.answers.map((answer, index) => {
          return <div className={`answer ${styles.hovering}`} key={index}
          onClick={({target}) => checkAnswer(target.textContent)}>{answer}</div>
        })}
      </div>
   );
}

export default AnswersCard;
