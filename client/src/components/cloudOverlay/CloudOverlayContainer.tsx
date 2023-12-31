import { useMemo } from 'react';
import { useAppSelector } from 'store/store';
import CloudOverlay from './CloudOverlay';

/** Legacy - 구름 댓글 기능(댓글이 displayTime에 오른쪽에서 생성되어 speed초에 왼쪽끝에 닿음) */
const CloudOverlayContainer = () => {
  const { clouds: _clouds } = useAppSelector((state) => state.clouds);
  const { video } = useAppSelector((state) => state.video);

  const clouds = useMemo(() => {
    if (!video) return [];
    return _clouds[video.id]?.data || [];
  }, [_clouds, video]);

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
