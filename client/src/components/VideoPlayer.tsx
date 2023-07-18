import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { setCurrentTime, setDuration } from '../store/modules/videoSlice';
import VideoProgressBar from './VideoProgressBar';
import VideoTimeDisplay from './VideoTimeDisplay';

const VideoPlayer = () => {
  const dispatch = useAppDispatch();
  const { src } = useAppSelector((state) => state.video);
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

    // 새로고침 시 비디오 로드
    // - 브라우저는 첫 방문때만 웹페이지의 자원을 로드하고 새로고침 시 캐시를 사용하려고 함
    // - 따라서 수동으로 비디오를 로드하거나 video tag에 매번 다른 key값을 할당하면 해결됨
    if (src) {
      videoElement.load();
    }

    return () => {
      videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      videoElement.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [dispatch, src]);

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
      <VideoProgressBar onClick={progressBarClickHandler} />
      <VideoTimeDisplay />
    </div>
  );
};

export default VideoPlayer;
