import { useEffect, useState } from 'react';
import { BsMoon, BsSun } from 'react-icons/bs';
import { Button } from 'components/atoms/Button';

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
      aria-label="darkMode toggle"
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
