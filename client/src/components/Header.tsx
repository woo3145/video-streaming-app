import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';

const Logo = () => {
  return (
    <Link to="/" className="text-2xl text-purple-600">
      <b>Woo3145</b> Videos
    </Link>
  );
};

const Header = () => {
  return (
    <>
      <header className="fixed top-0 w-full border-b z-40 bg-background">
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
