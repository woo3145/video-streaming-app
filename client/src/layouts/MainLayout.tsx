import { Outlet } from 'react-router-dom';
import Header from '../components/layouts/Header';

const MainLayout = () => {
  return (
    <div className="w-full bg-background font-sans">
      <Header />
      <div className="w-full min-h-[calc(100vh-4rem)] max-w-qhd px-4 mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
