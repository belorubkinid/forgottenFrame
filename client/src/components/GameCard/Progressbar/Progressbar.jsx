function ProgressBar({ progress }) {
  return (
    <div className="progress">
      <div className="determinate" style={{width: `${progress}%`}}></div>
    </div>
  )
}

export default ProgressBar;
