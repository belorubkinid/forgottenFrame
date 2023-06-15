function FrameCard({ frame }) {
 return (
    <div className="card large" style={{
        backgroundImage: `url(${frame})`,
      }}>
    </div>
 );
}

export default FrameCard;
