import { RefObject, useState } from 'react';
import PlayButton from './PlayButton';
import ProgressBar from './ProgressBar';
import VolumeController from './VolumeController';
import FullScreenButton from './FullScreenButton';
import TimeDisplay from './TimeDisplay';
import QualityButton from './QualityButton';
import { cn } from 'utils/twUtils';
import { useVideoController } from 'hooks/videoHooks/useVideoController';
import CloudsToggleButton from './CloudsToggleButton';

interface Props {
  videoRef: RefObject<HTMLVideoElement>;
}

const Controller = ({ videoRef }: Props) => {
  const { setCurrentVideoTime, togglePlayPause, changeVolume, toggleMute } =
    useVideoController(videoRef);

  const [isControllerVisible, setControllerVisible] = useState(false);

  const handleMouseEnter = () => setControllerVisible(true);
  const handleMouseLeave = () => {
    if (videoRef.current && !videoRef.current.paused) {
      setControllerVisible(false);
    }
  };

  const handleOverlayClick = () => {
    if (videoRef.current) {
      togglePlayPause(videoRef.current.paused);
    }
  };
  // 이벤트 버블링 끊기
  const handleControlClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div
      className={cn(
        'absolute top-0 left-0 w-full h-full flex flex-col justify-end text-white transition-opacity duration-300',
        'bg-gradient-to-r from-white to-black from-80% to-100%',
        isControllerVisible ? 'opacity-100' : 'opacity-0'
      )}
      style={{
        background:
          'linear-gradient(0deg, rgba(2,0,36,0.4) 0%, rgba(147,147,147,0) 30%)',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleOverlayClick}
    >
      {/* 실제 컨트롤러 클릭 시 오버레이로 이벤트 전파 막음 */}
      <div onClick={handleControlClick}>
        <ProgressBar
          onClick={setCurrentVideoTime}
          togglePlayPause={togglePlayPause}
        />
        <div className="flex items-center justify-between py-1 px-2">
          <div className="flex items-center gap-2">
            <PlayButton onClick={togglePlayPause} />
            <VolumeController
              onClickVolume={changeVolume}
              onClickMute={toggleMute}
            />
            <TimeDisplay />
          </div>
          <div className="flex items-center gap-2">
            <CloudsToggleButton />
            <QualityButton />
            <FullScreenButton videoRef={videoRef} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controller;
