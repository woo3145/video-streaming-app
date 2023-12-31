import Hls from 'hls.js';
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
} from 'store/modules/videoSlice';
import { useAppDispatch } from 'store/store';
import {
  appendQualityToFilename,
  changeExtensionToM3U8,
} from 'utils/commonUtils';

/**
 * 역할 : 비디오 재생을 위한 플레이어 관리
 * 
 * 1. videoSrc와 quality로 실제 동영상을 요청할 url을 생성하여 videoRef의 src에 설정 후 재생시킴
 * 2. 비디오 로딩 및 버퍼링 상태 관리(isLoading)
 * 3. 비디오 이벤트 핸들러 등록, 필요한 정보를 Redux에 저장
    (비디오 플레이어의 동작 상태 및 메타데이터를 처리하는 핸들러)
 * 
*/
const useVideoPlayer = (
  videoRef: RefObject<HTMLVideoElement>,
  videoSrc: string,
  videoQuality: TVideoQuality
) => {
  // 실제로 video를 요청 할 주소
  const videoUrl = useMemo(() => {
    return videoSrc !== ''
      ? `${
          process.env.REACT_APP_RESOURCE_URL
        }/encodedVideos/${appendQualityToFilename(
          videoSrc,
          videoQuality === 'auto' ? '360' : videoQuality
        )}`
      : '';
  }, [videoSrc, videoQuality]);

  const hlsVideoUrl = useMemo(() => {
    if (videoSrc === '') return '';

    // auto일 경우만 hls url 생성
    if (videoQuality === 'auto') {
      return `${
        process.env.REACT_APP_RESOURCE_URL
      }/encodedVideos/${changeExtensionToM3U8(videoSrc)}`;
    } else {
      return videoUrl;
    }
  }, [videoSrc, videoQuality, videoUrl]);

  const hls = useRef<Hls | null>(null);

  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false); // 비디오 로딩중 or 버퍼링중 상태

  const rafRef = useRef<number | null>(null); // currentTime을 업데이트 하는 requestAnimationFrame의 참조
  const [prevPosition, setPrevPosition] = useState(0); // 비디오의 품질이 변경 될 경우 상태 유지

  // 리덕스에 저장 하는 함수 : CurrentTime (requestAnimationFrame으로 업데이트)
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

  // 리덕스에 저장 하는 함수 : Video Display Size
  const updateVideoSize = useCallback(
    (videoElement: HTMLVideoElement) => {
      const { width, height } = videoElement.getBoundingClientRect();
      dispatch(setVideoSize({ width, height }));
    },
    [dispatch]
  );

  // 리덕스에 저장 하는 함수 : Video Buffered
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

  // 동영상 로드 후 이벤트 등록 (리덕스에 저장 하는 함수들, progress raf)
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

  // 비디오 Quality 변경 시 : 현재 재생시점 저장
  useEffect(() => {
    const videoEl = videoRef.current;
    return () => {
      if (videoEl) {
        setPrevPosition(videoEl.currentTime);
      }
    };
  }, [videoQuality, videoRef]);

  // 비디오 로드 & 자동재생
  useEffect(() => {
    const isAutoPlay = true; // 임시
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const tryToPlay = (videoEl: HTMLVideoElement) => {
      if (!isAutoPlay) return;
      videoEl
        .play()
        .then(() => {
          videoEl.muted = false;
          dispatch(setIsMuted(false));
          dispatch(setIsPlaying(true));
        })
        .catch((error) => {
          if (error.name === 'NotAllowedError') {
            console.error('미디어 정책에 의해 음소거 on');
            videoEl.muted = true;
            dispatch(setIsMuted(true));
            dispatch(setIsPlaying(true));
            videoEl.play();
          }
        });
    };

    // hls.js를 지원하는 경우
    if (Hls.isSupported() && videoQuality === 'auto') {
      if (hls.current !== null) {
        hls.current.destroy();
      }
      hls.current = new Hls();
      hls.current.loadSource(hlsVideoUrl);
      hls.current.attachMedia(videoElement);

      hls.current.on(Hls.Events.MANIFEST_PARSED, () => tryToPlay(videoElement));
    } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
      // 네이티브로 HLS를 지원하는 브라우저 (ex. Safari)에 대한 처리
      videoElement.src = hlsVideoUrl;
      tryToPlay(videoElement);
    } else {
      // hls를 지원하지 않는 브라우저 대응
      videoElement.src = videoUrl;
      tryToPlay(videoElement);

      // Auto play for native HLS support browsers
      if (isAutoPlay) {
        videoElement
          .play()
          .then(() => {
            videoElement.muted = false;
            dispatch(setIsMuted(false));
            dispatch(setIsPlaying(true));
          })
          .catch((error) => {
            if (error.name === 'NotAllowedError') {
              console.error('미디어 정책에 의해 음소거 on');
              videoElement.muted = true;
              dispatch(setIsMuted(true));
              dispatch(setIsPlaying(true));
              videoElement.play();
            }
          });
      }
    }
    return () => {
      if (hls.current) {
        hls.current.destroy();
        hls.current = null;
      }
    };
  }, [dispatch, videoRef, videoUrl, hlsVideoUrl, videoQuality]);

  return { isLoading };
};

export default useVideoPlayer;
