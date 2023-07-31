import { Link } from 'react-router-dom';

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
      <div className="fixed top-0 w-full bg-white z-40">
        <div className="flex items-center justify-between w-full h-16 px-4">
          <Logo />
        </div>
      </div>
      <div className="h-16" />
    </>
  );
};

export default Header;
