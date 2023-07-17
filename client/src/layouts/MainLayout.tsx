import { Link, Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div>
      <header>
        <h1 className="w-full py-2 bg-blue-900 text-white">Header</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="signin">SignIn</Link>
          <Link to="watch/1">Watch</Link>
        </nav>
      </header>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
