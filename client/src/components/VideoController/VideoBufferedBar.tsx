import { useAppSelector } from '../../store/store';

const VideoBufferedBar = () => {
  const { bufferedRanges, duration, currentTime } = useAppSelector(
    (state) => state.video
  );

  return (
    <div>
      {bufferedRanges.map((range, idx) => {
        // 버퍼링바 조각의 첫 시작이 현재 영상시점 이후에 있으면 표시안함
        if (currentTime < range.start) return null;
        return (
          <div
            key={idx}
            style={{
              left: `${(range.start / duration) * 100}%`,
              width: `${(range.end / duration) * 100}%`,
            }}
            className="absolute top-0 h-2 bg-gray-500 rounded-full"
          />
        );
      })}
    </div>
  );
};

export default VideoBufferedBar;
