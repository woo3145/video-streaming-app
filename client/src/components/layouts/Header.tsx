import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import { cn } from 'utils/twUtils';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 text-2xl text-primary">
      <img className="pb-2" src="/icons8-video-arcade-32.png" alt="video" />
      <b>Woo3145</b> Videos
    </Link>
  );
};

const Header = () => {
  return (
    <>
      <header className={cn(`fixed top-0 w-full z-50 border-b bg-background`)}>
        <div className="flex items-center justify-between w-full h-16 px-4">
          <Logo />
          <DarkModeToggle />
        </div>
      </header>
      <div className="h-16" />
    </>
  );
};

export default Header;
