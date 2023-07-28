import { RefObject } from 'react';
import VideoPlayButton from './VideoPlayButton';
import VideoProgressBar from './VideoProgressBar';
import VideoVolumeController from './VideoVolumeController';
import VideoFullscreenButton from './VideoFullScreenButton';
import VideoTimeDisplay from './VideoTimeDisplay';
import { useVideoController } from '../../hooks/video/useVideoController';

interface Props {
  videoRef: RefObject<HTMLVideoElement>;
}

const VideoController = ({ videoRef }: Props) => {
  const { setCurrentVideoTime, togglePlayPause, changeVolume, toggleMute } =
    useVideoController(videoRef);

  return (
    <div className="absolute bottom-0 left-0 flex flex-col w-full text-white">
      <VideoProgressBar onClick={setCurrentVideoTime} />
      <div className="flex items-center justify-between py-1 px-2">
        <div className="flex items-center gap-2">
          <VideoPlayButton onClick={togglePlayPause} />
          <VideoVolumeController
            onClickVolume={changeVolume}
            onClickMute={toggleMute}
          />
          <VideoTimeDisplay />
        </div>
        <VideoFullscreenButton videoRef={videoRef} />
      </div>
    </div>
  );
};

export default VideoController;
