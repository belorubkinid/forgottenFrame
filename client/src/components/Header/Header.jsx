import Navigation from '../Navigation/Navigation';
import { useSelector } from 'react-redux';

function Header() {
    const { player: { session }} = useSelector((store) => store);
  return (
    <Navigation session={session}/>
  );
}

export default Header;
