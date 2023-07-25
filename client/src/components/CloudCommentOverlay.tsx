import { useMockClouds } from '../hooks/useMockClouds';
import { useAppSelector } from '../store/store';
import CloudComment from './CloudComment';

const CloudCommentOverlay = () => {
  const { data: clouds } = useMockClouds();
  const { videoWidth, videoHeight, duration, currentTime } = useAppSelector(
    (state) => state.video
  );

  // 하나의 댓글이 지나가는 시간을 2초로 잡고 미리 overlay의 길이를 계산
  const overlayWidth = videoWidth * (duration / 2);

  // 현재 재생시점을 기준으로 오버레이가 지나간 px를 구함
  const calculateOverlayTranslateX = () => {
    const x = (currentTime / duration) * overlayWidth;
    return x;
  };
  return (
    <div
      className="text-lg pointer-events-none"
      style={{
        position: 'absolute',
        width: `${overlayWidth}px`,
        height: `${videoHeight}px`,
        transform: `translateX(-${calculateOverlayTranslateX()}px)`,
      }}
    >
      {clouds.map((cloud, idx) => {
        const left = `calc(100% * ${
          (cloud.displayTime / duration) * 2
        } + ${videoWidth}px)`;
        return <CloudComment cloudComment={cloud} key={idx} left={left} />;
      })}
    </div>
  );
};

export default CloudCommentOverlay;
