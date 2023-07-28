import { RefObject } from 'react';
import { useAppSelector } from '../store/store';
import VideoController from './VideoController/VideoController';
import { BeatLoader } from 'react-spinners';
import useVideoPlayer from '../hooks/video/useVideoPlayer';

interface Props {
  videoRef: RefObject<HTMLVideoElement>;
}

const VideoPlayer = ({ videoRef }: Props) => {
  const { src } = useAppSelector((state) => state.video);
  const { isLoading } = useVideoPlayer(videoRef, src);

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
