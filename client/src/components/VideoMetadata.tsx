import { useAppSelector } from '../store/store';

const VideoMetadata = () => {
  const { src, duration, currentTime } = useAppSelector((state) => state.video);

  return (
    <div>
      <h1>{src}</h1>
      <h1>{duration}</h1>
      <h1>{currentTime}</h1>
    </div>
  );
};

export default VideoMetadata;
