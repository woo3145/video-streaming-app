import { useMemo } from 'react';
import { useAppSelector } from 'store/store';
import CloudOverlay from './CloudOverlay';

const CloudOverlayContainer = () => {
  const { clouds } = useAppSelector((state) => state.clouds);
  const cloudOverlays = useMemo(
    () => [
      {
        speed: 3, // 댓글이 3초만에 지나감
        clouds: clouds.filter((cloud) => cloud.displaySpeed === 'fast'),
      },
      {
        speed: 5, // 댓글이 5초만에 지나감
        clouds: clouds.filter((cloud) => cloud.displaySpeed === 'medium'),
      },
      {
        speed: 7, // 댓글이 7초만에 지나감
        clouds: clouds.filter((cloud) => cloud.displaySpeed === 'slow'),
      },
    ],
    [clouds]
  );

  return (
    <>
      {cloudOverlays.map((overlay) => {
        return (
          <CloudOverlay
            key={overlay.speed}
            clouds={overlay.clouds}
            speed={overlay.speed}
          />
        );
      })}
    </>
  );
};

export default CloudOverlayContainer;
