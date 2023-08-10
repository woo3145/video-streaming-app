import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { BsFullscreen, BsFullscreenExit } from 'react-icons/bs';

interface Props {
  videoRef: MutableRefObject<HTMLVideoElement | null>;
}

const FullScreenButton = ({ videoRef }: Props) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  // 풀스크린 토글
  // 추후에 requestFullscreen 대체 필요(Custom Controller UI를 사용하기 위해)
  const handleFullscreen = useCallback(() => {
    if (!document.fullscreenElement && videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if ((videoRef.current as any).mozRequestFullScreen) {
        /* Firefox */
        (videoRef.current as any).mozRequestFullScreen();
      } else if ((videoRef.current as any).webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        (videoRef.current as any).webkitRequestFullscreen();
      } else if ((videoRef.current as any).msRequestFullscreen) {
        /* IE/Edge */
        (videoRef.current as any).msRequestFullscreen();
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
  }, [videoRef]);

  // 풀스크린 변화 시 지역상태 업데이트
  const handleFullscreenChange = useCallback(() => {
    if (document.fullscreenElement) {
      setIsFullScreen(true);
    } else {
      setIsFullScreen(false);
    }
  }, []);
  useEffect(() => {
    //Esc에도 반응하도록 fullscreenchange 이벤트 사용
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [handleFullscreenChange]);

  return (
    <div
      onClick={handleFullscreen}
      className="flex items-center justify-center w-8 h-8 rounded-md text-xl cursor-pointer duration-300 hover:bg-gray-700"
    >
      {isFullScreen ? <BsFullscreenExit /> : <BsFullscreen />}
    </div>
  );
};

export default FullScreenButton;
