import { RefObject, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setVolume } from '../../store/modules/videoSlice';
import { useVideoSeek } from '../../hooks/video/useVideoSeek';

export const useVideoController = (videoRef: RefObject<HTMLVideoElement>) => {
  const dispatch = useAppDispatch();
  const volume = useAppSelector((state) => state.video.volume);
  const { setCurrentVideoTime } = useVideoSeek(videoRef);

  // 비디오 로드 or 리덕스 볼륨 변경 시 비디오 볼륨 조절
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    videoElement.volume = volume;
  }, [videoRef, volume]);

  // 볼륨 변경
  const changeVolume = (newVolume: number) => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    dispatch(setVolume(newVolume));
  };

  // 음소거 토글
  const toggleMute = (isMuted: boolean) => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    videoElement.muted = isMuted;
  };

  // 영상 재생 & 일시정지
  const togglePlayPause = (isPlaying: boolean) => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (isPlaying) {
      videoElement.play();
    } else {
      videoElement.pause();
    }
  };

  return {
    setCurrentVideoTime,
    changeVolume,
    toggleMute,
    togglePlayPause,
  };
};
