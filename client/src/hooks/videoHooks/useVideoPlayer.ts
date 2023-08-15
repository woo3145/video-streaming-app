import {
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  setBufferedRanges,
  setCurrentTime,
  setDuration,
  setIsMuted,
  setIsPlaying,
  setVideoSize,
  setVideoSrc,
} from 'store/modules/videoSlice';
import { useAppDispatch } from 'store/store';

/**
 * 역할 : 비디오 재생을 위한 플레이어 관리
 * 
 * 1. videoId와 quality로 비디오 주소를 생성하여 videoSrc에 저장
 * 2. 비디오 로딩 및 버퍼링 상태 관리(isLoading)
 * 3. 비디오 이벤트 핸들러 등록, 필요한 정보를 Redux에 저장
    (비디오 플레이어의 동작 상태 및 메타데이터를 처리하는 핸들러)
 * 
*/
const useVideoPlayer = (
  videoRef: RefObject<HTMLVideoElement>,
  videoId: number,
  videoQuality: TVideoQuality
) => {
  const videoSrc = useMemo(() => {
    return videoId !== 0
      ? `${process.env.REACT_APP_API_URL}/videos/${videoQuality}/${videoId}`
      : '';
  }, [videoId, videoQuality]);

  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false); // 비디오 로딩중 or 버퍼링중 상태

  const rafRef = useRef<number | null>(null); // currentTime을 업데이트 하는 requestAnimationFrame의 참조
  const [prevPosition, setPrevPosition] = useState(0); // 비디오의 품질이 변경 될 경우 상태 유지

  // 리덕스 저장 : CurrentTime (requestAnimationFrame으로 업데이트)
  const updateProgress = useCallback(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (rafRef.current !== null && videoElement) {
      dispatch(setCurrentTime(videoElement.currentTime));
      // 재생중일때만 재귀실행
      if (!videoElement.paused) {
        rafRef.current = requestAnimationFrame(updateProgress);
      } else {
        rafRef.current = null;
      }
    }
  }, [dispatch, videoRef]);

  // 리덕스 저장 : Video Display Size
  const updateVideoSize = useCallback(
    (videoElement: HTMLVideoElement) => {
      const { width, height } = videoElement.getBoundingClientRect();
      dispatch(setVideoSize({ width, height }));
    },
    [dispatch]
  );

  // 리덕스 저장 : Video Buffered
  const updateBufferedRanges = useCallback(
    (videoElement: HTMLVideoElement) => {
      const buffered = videoElement.buffered;
      const bufferedRanges: { start: number; end: number }[] = [];
      for (let i = 0; i < buffered.length; ++i) {
        bufferedRanges.push({ start: buffered.start(i), end: buffered.end(i) });
      }
      dispatch(setBufferedRanges(bufferedRanges));
    },
    [dispatch]
  );

  // 동영상 로드 후 이벤트 등록 (리덕스 저장, window resize, progress raf)
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    setIsLoading(true); // 비디오 메타데이터가 로드되기 전에 로딩중 표시
    videoElement.currentTime = prevPosition; // 저장된 비디오 재생위치가 있다면 로드

    // 메타데이터 로드 후
    // 리덕스 저장: Duration && Video Size
    // Raf등록: updateProgress
    const handleLoadedMetadata = () => {
      dispatch(setDuration(videoElement.duration));
      updateVideoSize(videoElement);
      setIsLoading(false); // 메타데이터 로드 완료 후 로딩상태 해제

      // 메타데이터 로드 후 재생중이면 raf 등록
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (!videoElement.paused) {
        rafRef.current = requestAnimationFrame(updateProgress);
      }
    };

    // play - raf 실행, 리덕스 저장
    const handlePlay = () => {
      dispatch(setIsPlaying(true));
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(updateProgress);
      }
    };
    // pause - raf 제거, 리덕스 저장
    const handlePause = () => {
      dispatch(setIsPlaying(false));
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
    // waiting 상태에 따라 loading 상태 변경 (버퍼링 상태)
    const handlePlaying = () => {
      setIsLoading(false);
    };
    const handleWaiting = () => {
      setIsLoading(true);
    };
    const handleResize = () => {
      updateVideoSize(videoElement);
    };
    const handleTimeupdate = () => {
      updateBufferedRanges(videoElement);
    };

    window.addEventListener('resize', handleResize); // cloudOverlay에서 필요
    videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    videoElement.addEventListener('play', handlePlay);
    videoElement.addEventListener('pause', handlePause);
    videoElement.addEventListener('playing', handlePlaying);
    videoElement.addEventListener('waiting', handleWaiting);
    videoElement.addEventListener('timeupdate', handleTimeupdate);

    return () => {
      window.removeEventListener('resize', handleResize);
      videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      videoElement.removeEventListener('play', handlePlay);
      videoElement.removeEventListener('pause', handlePause);
      videoElement.removeEventListener('playing', handlePlaying);
      videoElement.removeEventListener('waiting', handleWaiting);
      videoElement.removeEventListener('timeupdate', handleTimeupdate);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [
    dispatch,
    videoRef,
    prevPosition,
    updateProgress,
    updateVideoSize,
    updateBufferedRanges,
  ]);

  // 비디오 src 저장
  useEffect(() => {
    if (videoRef.current && videoRef.current.src !== videoSrc) {
      dispatch(setVideoSrc(videoSrc));
    }
  }, [dispatch, videoRef, videoSrc]);

  // 비디오 Quality 변경 시 : 현재 재생시점 저장
  useEffect(() => {
    if (videoRef.current) {
      setPrevPosition(videoRef.current.currentTime);
    }
  }, [videoQuality, videoRef]);

  // 비디오 로드 후 자동재생
  useEffect(() => {
    const isAutoPlay = true;
    const videoElement = videoRef.current;
    if (!videoElement) return;

    // - 브라우저는 페이지 로드 후(비디오 로드 시점 x, 페이지 로드 시점 o) 사용자의 인터랙션이 일어나기 전에 미디어의 소리까지 자동재생이 불가능 하도록 막아둠
    // - 따라서 mute 상태로 구현하거나 일시정지 상태여야함
    // - SPA의 경우 Home -> Watch로 이동 시 이전 상호작용이 기록되어 있어 소리까지 자동 재생 가능
    // - SPA라도 새로고침 등으로 Watch로 첫 접속을 하면 소리까지 재생 X

    // 비디오 로드와 재생
    if (videoSrc !== '' && videoElement.src !== videoSrc) {
      videoElement.src = videoSrc;
      dispatch(setVideoSrc(videoSrc));
      if (isAutoPlay) {
        videoElement
          .play()
          .then(() => {
            dispatch(setIsPlaying(true));
          })
          .catch((error) => {
            if (error.name === 'NotAllowedError') {
              console.error('미디어 정책에 의해 음소거 on');
              videoElement.muted = true;
              videoElement.play();
              dispatch(setIsMuted(true));
              dispatch(setIsPlaying(true));
            }
          });
      }
    }
  }, [dispatch, videoRef, videoSrc]);

  return { src: videoSrc, isLoading };
};

export default useVideoPlayer;
