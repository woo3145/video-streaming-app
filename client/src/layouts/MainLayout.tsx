import Header from 'components/layouts/Header';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="w-full bg-background text-foreground font-sans">
      <Header />
      <div className="w-full min-h-[calc(100vh-4rem)] max-w-qhd px-4 mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
