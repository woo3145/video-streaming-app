import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import { cn } from 'utils/twUtils';

const Logo = () => {
  return (
    <Link to="/" className="text-2xl text-primary">
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
