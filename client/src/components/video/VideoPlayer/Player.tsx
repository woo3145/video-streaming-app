import { RefObject } from 'react';
import { useAppSelector } from '../../../store/store';
import Controller from './Controller/Controller';
import { BeatLoader } from 'react-spinners';
import useVideoPlayer from '../../../hooks/video/useVideoPlayer';

interface Props {
  videoRef: RefObject<HTMLVideoElement>;
}

const Player = ({ videoRef }: Props) => {
  const { id: videoId } = useAppSelector((state) => state.video);
  const videoQuality = useAppSelector((state) => state.videoQuality.quality);
  const { src, isLoading } = useVideoPlayer(videoRef, videoId, videoQuality);

  return (
    <div>
      <div className="relative flex items-center justify-center">
        {/* 항상 16:9 비율 유지 */}
        <div className="relative w-full h-0 pb-[56.25%] overflow-hidden bg-black">
          <video
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full object-contain"
          >
            <source src={src} type="video/mp4" />
          </video>
        </div>
        <div className="absolute">
          <BeatLoader
            loading={isLoading}
            size={20}
            color={'#a855f7'}
            aria-label="Loading Spinner"
          />
        </div>
        <Controller videoRef={videoRef} />
      </div>
    </div>
  );
};

export default Player;
