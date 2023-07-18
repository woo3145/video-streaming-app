import { RefObject } from 'react';
import VideoPlayButton from './VideoPlayButton';
import { useAppDispatch } from '../../store/store';
import { setCurrentTime } from '../../store/modules/videoSlice';
import VideoProgressBar from './VideoProgressBar';

interface Props {
  videoRef: RefObject<HTMLVideoElement>;
}

const VideoController = ({ videoRef }: Props) => {
  const dispatch = useAppDispatch();

  // 영상 구간 이동
  const handleProgressBarClick = (time: number) => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    videoElement.currentTime = time;
    dispatch(setCurrentTime(time));
  };

  // 영상 재생 & 일시정지
  const handlePlayPause = (isPlaying: boolean) => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (isPlaying) {
      videoElement.play();
    } else {
      videoElement.pause();
    }
  };

  return (
    <div>
      <VideoPlayButton onClick={handlePlayPause} />
      <VideoProgressBar onClick={handleProgressBarClick} />
    </div>
  );
};

export default VideoController;
