import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SessionAccesser() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/');
  }, [ navigate ]);

  return;
}

export default SessionAccesser;
