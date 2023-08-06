import { RefObject, useState } from 'react';
import { useAppSelector } from '../store/store';
import VideoController from './VideoController/VideoController';
import { BeatLoader } from 'react-spinners';
import useVideoPlayer from '../hooks/video/useVideoPlayer';

interface Props {
  videoRef: RefObject<HTMLVideoElement>;
}

const VideoPlayer = ({ videoRef }: Props) => {
  const { id: videoId } = useAppSelector((state) => state.video);
  const [videoQuality, setVideoQuality] = useState<'low' | 'medium' | 'high'>(
    'high'
  ); // 리덕스로 관리 예정
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
        <VideoController videoRef={videoRef} />
      </div>
      <div onClick={() => setVideoQuality('low')}>Change Low</div>
      <div onClick={() => setVideoQuality('high')}>Change High</div>
    </div>
  );
};

export default VideoPlayer;
