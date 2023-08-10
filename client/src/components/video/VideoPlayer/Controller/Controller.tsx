import { RefObject } from 'react';
import PlayButton from './PlayButton';
import ProgressBar from './ProgressBar';
import VolumeController from './VolumeController';
import FullScreenButton from './FullScreenButton';
import TimeDisplay from './TimeDisplay';
import QualityButton from './QualityButton';
import { useVideoController } from '../../../../hooks/video/useVideoController';

interface Props {
  videoRef: RefObject<HTMLVideoElement>;
}

const Controller = ({ videoRef }: Props) => {
  const { setCurrentVideoTime, togglePlayPause, changeVolume, toggleMute } =
    useVideoController(videoRef);

  return (
    <div className="absolute bottom-0 left-0 flex flex-col w-full text-white">
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
          <QualityButton />
          <FullScreenButton videoRef={videoRef} />
        </div>
      </div>
    </div>
  );
};

export default Controller;
