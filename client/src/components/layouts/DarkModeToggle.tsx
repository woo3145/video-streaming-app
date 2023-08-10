import { useEffect, useState } from 'react';
import { Button } from '../atoms/Button';
import { BsMoon, BsSun } from 'react-icons/bs';

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  return (
    <Button
      type="button"
      onClick={() => {
        setDarkMode(!darkMode);
      }}
      variant={'ghost'}
      size="icon"
    >
      {darkMode ? <BsMoon /> : <BsSun />}
    </Button>
  );
};

export default DarkModeToggle;
