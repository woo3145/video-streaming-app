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

const useVideoPlayer = (videoRef: RefObject<HTMLVideoElement>, src: string) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false); // 비디오 로딩중 or 버퍼링중 상태

  const rafRef = useRef<number | null>(null); // currentTime을 업데이트 하는 requestAnimationFrame의 참조

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

    // 리덕스 저장: Video Size
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
      dispatch(setIsPlaying(true));
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(updateProgress);
      }
    };
    // 리덕스 상태 저장 && raf 제거
    const handlePause = () => {
      dispatch(setIsPlaying(false));
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
    // - 브라우저는 첫 방문때만 웹페이지의 자원을 로드하고 새로고침 시 캐시를 사용하려고 함
    // - 따라서 수동으로 비디오를 로드하거나 video tag에 매번 다른 key값을 할당하면 해결됨
    if (src) {
      videoElement.load();
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
  }, [dispatch, src, updateProgress, videoRef]);

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
  }, [dispatch, videoRef]);

  return { isLoading };
};

export default useVideoPlayer;
