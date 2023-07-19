import { RefObject, useEffect } from 'react';
import VideoPlayButton from './VideoPlayButton';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setCurrentTime, setVolume } from '../../store/modules/videoSlice';
import VideoProgressBar from './VideoProgressBar';
import VideoVolumeController from './VideoVolumeController';
import VideoFullscreenButton from './VideoFullScreenButton';

interface Props {
  videoRef: RefObject<HTMLVideoElement>;
}

const VideoController = ({ videoRef }: Props) => {
  const volume = useAppSelector((state) => state.video.volume);
  const dispatch = useAppDispatch();

  // 비디오 로드 or 리덕스 볼륨 변경 시 비디오 볼륨 조절
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    videoElement.volume = volume;
  }, [videoRef, volume]);

  // 영상 구간 이동
  const handleProgressBar = (time: number) => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    videoElement.currentTime = time;
    dispatch(setCurrentTime(time));
  };

  // 볼륨 변경
  const handleVolume = (newVolume: number) => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    dispatch(setVolume(newVolume));
  };
  // 음소거
  const handleMute = (isMuted: boolean) => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    if (isMuted) {
      videoElement.muted = true;
    } else {
      videoElement.muted = false;
    }
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
      <VideoVolumeController
        onClickVolume={handleVolume}
        onClickMute={handleMute}
      />
      <VideoProgressBar onClick={handleProgressBar} />
      <VideoFullscreenButton videoRef={videoRef} />
    </div>
  );
};

export default VideoController;
