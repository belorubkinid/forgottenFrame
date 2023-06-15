import M from 'materialize-css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resetError } from '../../redux/actions/error.action';

function Error({ message }) {
  M.toast({html: message})
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);
  return;
}

export default Error;
