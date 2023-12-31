import Footer from 'components/layouts/Footer';
import Header from 'components/layouts/Header';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="w-full bg-background text-foreground font-sans">
      <Header />
      <div className="w-full min-h-[calc(100vh-4rem)] max-w-qhd mx-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
