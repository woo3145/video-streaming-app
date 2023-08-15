import { RefObject, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/store';
import { useVideoSeek } from './useVideoSeek';
import { setIsMuted, setVolume } from 'store/modules/videoSlice';

/**
 * 역할: 비디오 컨트롤을 위한 커스텀 훅
 * (재생, 일시정지, 음소거, 볼륨 조절)
 *  - 구간이동은 useVideoSeek로 분리
 */
export const useVideoController = (videoRef: RefObject<HTMLVideoElement>) => {
  const dispatch = useAppDispatch();
  const { volume, isMuted } = useAppSelector((state) => state.video);
  const { setCurrentVideoTime } = useVideoSeek(videoRef);

  // 리덕스 볼륨 변경 & 음소거 시 실제 비디오 상태 변경
  // 새로 비디오 로드 시 이전 상태 적용
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    videoElement.volume = volume;
    videoElement.muted = isMuted;
  }, [videoRef, volume, isMuted]);

  // 볼륨 변경(Redux 변경)
  const changeVolume = (newVolume: number) => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    dispatch(setVolume(newVolume));
  };

  // 음소거 토글(Redux 변경)
  const toggleMute = (isMuted: boolean) => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    dispatch(setIsMuted(isMuted));
  };

  // 영상 재생 & 일시정지
  const togglePlayPause = (isPlaying: boolean) => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (isPlaying) {
      const playPromise = videoElement.play();

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error('Playback error:', error);
        });
      }
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
