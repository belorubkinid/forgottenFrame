import styles from './styles.module.css'

function LoadingCard({ message }) {
  return (
    <div id={styles.loader}>
      <div></div>
      <div>
        <div>{message}</div>
        <div className="progress">
            <div className="indeterminate"></div>
        </div>
      </div>
      <div></div>
      <div></div>
    </div>
  )
}

export default LoadingCard;
