import { useMemo } from 'react';
import { useAppSelector } from 'store/store';
import CloudOverlayItem from './CloudOverlayItem';

const CloudOverlay = () => {
  const { clouds } = useAppSelector((state) => state.clouds);
  const { videoWidth, videoHeight, duration, currentTime } = useAppSelector(
    (state) => state.video
  );

  // 하나의 댓글이 지나가는 시간을 5초로 잡고 미리 overlay의 길이를 계산
  const overlayWidth = useMemo(
    () => videoWidth * (duration / 5),
    [videoWidth, duration]
  );

  // 현재 재생시점을 기준으로 오버레이가 지나간 px를 구함
  const calculatedOverlayTranslateX = useMemo(() => {
    return (currentTime / duration) * overlayWidth;
  }, [currentTime, duration, overlayWidth]);

  return (
    <div
      className="top-0 text-lg pointer-events-none min-w-full"
      style={{
        position: 'absolute',
        width: `${overlayWidth}px`,
        height: `${videoHeight}px`,
        transform: `translateX(${-calculatedOverlayTranslateX}px)`,
      }}
    >
      {clouds.map((cloud, idx) => {
        const left = `calc(100% * ${
          cloud.displayTime / duration
        } + ${videoWidth}px)`;
        return <CloudOverlayItem cloudComment={cloud} key={idx} left={left} />;
      })}
    </div>
  );
};

export default CloudOverlay;
