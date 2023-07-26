import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import {
  setBufferedRanges,
  setCurrentTime,
  setDuration,
  setIsPlaying,
  setVideoSize,
} from '../store/modules/videoSlice';
import VideoController from './VideoController/VideoController';
import { BeatLoader } from 'react-spinners';

const VideoPlayer = () => {
  const dispatch = useAppDispatch();
  const { src } = useAppSelector((state) => state.video);
  const videoRef = useRef<HTMLVideoElement>(null);
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
  }, [dispatch]);

  // 동영상 메타데이터 로드 완료 시 동영상 길이 저장 && timeupdate 이벤트 등록
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    setIsLoading(true); // 비디오 메타데이터가 로드되기 전에 로딩중 표시

    // 비디오 width,height 리덕스에 저장 (window 리사이징 or 동영상 메타데이터 로드 완료 시)
    const handleVideoResize = () => {
      const { width, height } = videoElement.getBoundingClientRect();
      dispatch(setVideoSize({ width, height }));
    };
    window.addEventListener('resize', handleVideoResize);

    const handleLoadedMetadata = () => {
      dispatch(setDuration(videoElement.duration));
      handleVideoResize();
      setIsLoading(false); // 메타데이터 로드 완료 후 로딩상태 해제

      // 메타데이터가 로드 완료 되면 raf 실행
      if (rafRef.current) cancelAnimationFrame(rafRef.current); // 이전 raf이 있다면 취소
      rafRef.current = requestAnimationFrame(updateProgress);
    };

    const handlePlay = () => {
      dispatch(setIsPlaying(true));
      // raf 실행
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(updateProgress);
      }
    };
    const handlePause = () => {
      dispatch(setIsPlaying(false));
      // raf 제거
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
    const handlePlaying = () => {
      setIsLoading(false);
    };
    const handleWaiting = () => {
      setIsLoading(true);
    };

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
      videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      videoElement.removeEventListener('play', handlePlay);
      videoElement.removeEventListener('pause', handlePause);
      videoElement.removeEventListener('playing', handlePlaying);
      videoElement.removeEventListener('waiting', handleWaiting);
      window.removeEventListener('resize', handleVideoResize);

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [dispatch, src, updateProgress]);

  // 버퍼링 상태를 저장하는 이벤트 등록
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    // 버퍼링 조각 정보를 리덕스에 저장하는 함수
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
  }, [dispatch]);

  return (
    <div className="relative flex items-center justify-center w-full max-h-[720px] bg-black">
      <video ref={videoRef} className="w-full max-h-[720px]">
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute">
        <BeatLoader
          loading={isLoading}
          size={20}
          color={'#a855f7'}
          aria-label="Loading Spinner"
        />
      </div>
      <VideoController videoRef={videoRef} />
    </div>
  );
};

export default VideoPlayer;
