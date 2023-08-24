import { RefObject, useRef } from 'react';
import Controller from './Controller/Controller';
import { BeatLoader } from 'react-spinners';
import { useAppSelector } from 'store/store';
import useVideoPlayer from 'hooks/videoHooks/useVideoPlayer';
import { cn } from 'utils/twUtils';
import CloudOverlayContainer from 'components/cloudOverlay/CloudOverlayContainer';
import { CloudCanvas } from 'components/cloudOverlay/CloudCanvas';

interface Props {
  videoRef: RefObject<HTMLVideoElement>;
}

const Player = ({ videoRef }: Props) => {
  const { id: videoId, src } = useAppSelector((state) => state.video);
  const { quality } = useAppSelector((state) => state.videoQuality);
  const { isLoading } = useVideoPlayer(videoRef, videoId, quality);

  const { isVisible } = useAppSelector((state) => state.clouds);

  // fullscreen을 위해 video, overlay, loading, controller를 감싼 컴포넌트
  const playerRef = useRef<HTMLDivElement>(null);

  const isLegacy = false;

  return (
    <div
      ref={playerRef}
      className={cn('relative flex items-center justify-center')}
    >
      {/* 항상 16:9 비율 유지 */}
      <div
        className={cn(
          'relative w-full h-0 pb-[56.25%] overflow-hidden bg-black'
        )}
      >
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-contain"
        >
          <source src={src} type="video/mp4" />
        </video>

        {/* Overlay */}
        {isVisible && isLegacy && <CloudOverlayContainer />}
        {isVisible && !isLegacy && <CloudCanvas />}
      </div>
      <div className="absolute">
        <BeatLoader
          loading={isLoading}
          size={20}
          color={'#a855f7'}
          aria-label="Loading Spinner"
        />
      </div>
      <Controller videoRef={videoRef} playerRef={playerRef} />
    </div>
  );
};

export default Player;
