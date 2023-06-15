import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoadingCard from "../LoadingCard/LoadingCard";
import RatingTable from "./RatingTable/RatingTable";
import { startInitOveralRating } from "../../redux/actions/rating.action";
import { startLoading } from "../../redux/actions/loading.action";

function Rating() {
  const { rating, player: { nickname }, loading } = useSelector((store) => store);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoading());
    dispatch(startInitOveralRating());
  }, [dispatch])

  return (
    <div className='row conteiner'>
      {loading.status ? 
      <LoadingCard message={'Загрузка рейтинга'}/>
      : <RatingTable rating={rating} nickname={nickname} />}
    </div>
  )
}

export default Rating;
