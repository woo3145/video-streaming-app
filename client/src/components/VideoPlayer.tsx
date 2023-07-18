import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { setCurrentTime, setDuration } from '../store/modules/videoSlice';
import VideoProgressBar from './VideoProgressBar';

const VideoPlayer = () => {
  const dispatch = useAppDispatch();
  const { src, duration, currentTime } = useAppSelector((state) => state.video);
  const videoRef = useRef<HTMLVideoElement>(null);

  // 동영상 메타데이터 로드 완료 시 동영상 길이 저장 && timeupdate 이벤트 등록
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleLoadedMetadata = () => {
      dispatch(setDuration(videoElement.duration));
    };
    const handleTimeUpdate = () => {
      dispatch(setCurrentTime(videoElement.currentTime));
    };

    videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    videoElement.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [dispatch]);

  // progressBar를 클릭하여 구간이동을 하는 함수
  const progressBarClickHandler = (time: number) => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    videoElement.currentTime = time;
    dispatch(setCurrentTime(time));
  };

  return (
    <div className="w-full h-auto">
      <video ref={videoRef} controls>
        <source src={src} type="video/mp4" />
      </video>
      <VideoProgressBar
        duration={duration}
        currentTime={currentTime}
        onClick={progressBarClickHandler}
      />
    </div>
  );
};

export default VideoPlayer;
