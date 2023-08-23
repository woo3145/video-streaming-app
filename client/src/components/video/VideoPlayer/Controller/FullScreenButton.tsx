import React, {
  MutableRefObject,
  RefObject,
  useCallback,
  useEffect,
} from 'react';
import { BsFullscreen, BsFullscreenExit } from 'react-icons/bs';
import { setIsFullScreen, setVideoSize } from 'store/modules/videoSlice';
import { useAppDispatch, useAppSelector } from 'store/store';

interface Props {
  playerRef: MutableRefObject<HTMLDivElement | null>;
  videoRef: RefObject<HTMLVideoElement>;
}

const FullScreenButton = ({ playerRef, videoRef }: Props) => {
  const dispatch = useAppDispatch();
  const { isFullScreen } = useAppSelector((state) => state.video);

  // 풀스크린 document에 요청
  const handleFullscreen = useCallback(() => {
    if (!document.fullscreenElement && playerRef.current) {
      if (playerRef.current.requestFullscreen) {
        playerRef.current.requestFullscreen();
      } else if ((playerRef.current as any).mozRequestFullScreen) {
        /* Firefox */
        (playerRef.current as any).mozRequestFullScreen();
      } else if ((playerRef.current as any).webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        (playerRef.current as any).webkitRequestFullscreen();
      } else if ((playerRef.current as any).msRequestFullscreen) {
        /* IE/Edge */
        (playerRef.current as any).msRequestFullscreen();
      }
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).mozCancelFullScreen) {
      (document as any).mozCancelFullScreen();
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    } else if ((document as any).msExitFullscreen) {
      (document as any).msExitFullscreen();
    }
  }, [playerRef]);

  // 풀스크린 변화 시 지역상태 업데이트
  const handleFullscreenChange = useCallback(() => {
    if (document.fullscreenElement) {
      dispatch(setIsFullScreen(true));
    } else {
      dispatch(setIsFullScreen(false));
    }
    // 리덕스 비디오 사이즈 수정
    setTimeout(() => {
      // fullscreenchange 완료 후에 실행하되록 setTimeout 사용
      if (videoRef.current) {
        const { width, height } = videoRef.current.getBoundingClientRect();
        dispatch(setVideoSize({ width, height }));
      }
    }, 100);
  }, [dispatch, videoRef]);

  useEffect(() => {
    //Esc에도 반응하도록 fullscreenchange 이벤트 사용
    // *** 주의점: fullscreenchange가 완료되는 시점에 실행되는게 아님 ***
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [handleFullscreenChange]);

  return (
    <div
      onClick={handleFullscreen}
      className="flex items-center justify-center w-8 h-8 rounded-md text-xl cursor-pointer duration-300 hover:bg-accent hover:text-accent-foreground"
    >
      {isFullScreen ? <BsFullscreenExit /> : <BsFullscreen />}
    </div>
  );
};

export default FullScreenButton;
