import { useCallback } from 'react';
import { useAppSelector } from 'store/store';

const TimeDisplay = () => {
  const { duration, currentTime } = useAppSelector((state) => state.video);

  const format = useCallback((time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }, []);

  return (
    <div className="text-sm">
      {format(currentTime)} / {format(duration)}
    </div>
  );
};

export default TimeDisplay;
