// hooks/useVideoPlayer.ts
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch } from '../../store/store';
import {
  setBufferedRanges,
  setCurrentTime,
  setDuration,
  setIsPlaying,
  setVideoSize,
} from '../../store/modules/videoSlice';

const useVideoPlayer = (
  videoRef: RefObject<HTMLVideoElement>,
  videoId: number,
  videoQuality: TVideoQuality
) => {
  const videoSrc = videoId
    ? `http://localhost:4000/videos/${videoQuality}/${videoId}`
    : '';

  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false); // 비디오 로딩중 or 버퍼링중 상태

  const rafRef = useRef<number | null>(null); // currentTime을 업데이트 하는 requestAnimationFrame의 참조
  const [currentPosition, setCurrentPosition] = useState(0); // 비디오의 품질이 변경 될 경우 상태 유지

  useEffect(() => {
    if (videoRef.current) {
      // 비디오 재생위치 저장해놓기
      setCurrentPosition(videoRef.current.currentTime);
    }
  }, [videoQuality, videoRef]);
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
  }, [videoQuality, videoRef]);

  // 동영상의 currentTime을 리덕스에 저장하는 함수
  const updateProgress = useCallback(() => {
    if (rafRef.current !== null && videoRef.current) {
      dispatch(setCurrentTime(videoRef.current.currentTime));
      // 재생중일때만 재귀실행
      if (!videoRef.current.paused) {
        rafRef.current = requestAnimationFrame(updateProgress);
      } else {
        rafRef.current = null;
      }
    }
  }, [dispatch, videoRef]);

  // 동영상 메타데이터 로드 완료 시 동영상 길이 저장 && timeupdate 이벤트 등록
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    setIsLoading(true); // 비디오 메타데이터가 로드되기 전에 로딩중 표시

    videoElement.currentTime = currentPosition;
    // 리덕스 저장: Video Size
    // 구름 오버레이를 위해 브라우저의 크기에 따른 video태그의 크기를 추적
    const handleVideoResize = () => {
      const { width, height } = videoElement.getBoundingClientRect();
      dispatch(setVideoSize({ width, height }));
    };

    // 메타데이터 로드 완료 후
    // 리덕스 저장: Duration && Video Size
    // Raf등록: updateProgress
    const handleLoadedMetadata = () => {
      dispatch(setDuration(videoElement.duration));
      handleVideoResize();
      setIsLoading(false); // 메타데이터 로드 완료 후 로딩상태 해제

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateProgress);
    };

    // 리덕스 상태 저장 && raf 실행
    const handlePlay = () => {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(updateProgress);
      }
    };
    // 리덕스 상태 저장 && raf 제거
    const handlePause = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
    // waiting 상태에 따라 loading 상태 변경
    const handlePlaying = () => {
      setIsLoading(false);
    };
    const handleWaiting = () => {
      setIsLoading(true);
    };

    window.addEventListener('resize', handleVideoResize);
    videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    videoElement.addEventListener('play', handlePlay);
    videoElement.addEventListener('pause', handlePause);
    videoElement.addEventListener('playing', handlePlaying);
    videoElement.addEventListener('waiting', handleWaiting);

    // 새로고침 시 비디오 로드
    // - 브라우저는 페이지 로드 후 사용자의 인터랙션이 일어나기 전에 미디어의 소리까지 자동재생이 불가능 하도록 막아둠
    // - 따라서 mute 상태로 구현하거나 로드만 하고 자동재생을 막아두어야함
    // - SPA의 경우 Home -> Watch로 이동 시 이전 상호작용이 기록되어 있어 소리까지 자동 재생됨
    // 비디오 로드와 재생
    if (videoSrc) {
      videoElement.src = videoSrc;
      videoElement.play().catch((error) => {
        console.error('Error playing video:', error);
      });
      dispatch(setIsPlaying(true));
    }

    return () => {
      window.removeEventListener('resize', handleVideoResize);
      videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      videoElement.removeEventListener('play', handlePlay);
      videoElement.removeEventListener('pause', handlePause);
      videoElement.removeEventListener('playing', handlePlaying);
      videoElement.removeEventListener('waiting', handleWaiting);

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [dispatch, videoSrc, updateProgress, videoRef, currentPosition]);

  // 버퍼링 상태를 저장하는 이벤트 등록
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    // 리덕스 저장: 버퍼링 조각들
    const updateBufferedRanges = () => {
      const buffered = videoElement.buffered;
      const bufferedRanges: { start: number; end: number }[] = [];
      for (let i = 0; i < buffered.length; ++i) {
        bufferedRanges.push({ start: buffered.start(i), end: buffered.end(i) });
      }
      dispatch(setBufferedRanges(bufferedRanges));
    };
    videoElement.addEventListener('progress', updateBufferedRanges);

    return () => {
      videoElement.removeEventListener('progress', updateBufferedRanges);
    };
  }, [dispatch, videoRef, videoSrc]);

  return { src: videoSrc, isLoading };
};

export default useVideoPlayer;
