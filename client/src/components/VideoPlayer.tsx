import { RefObject, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import VideoController from './VideoController/VideoController';
import { BeatLoader } from 'react-spinners';
import useVideoPlayer from '../hooks/video/useVideoPlayer';
import { setVideoQuality } from '../store/modules/videoQualitySlice';

interface Props {
  videoRef: RefObject<HTMLVideoElement>;
}

const VideoPlayer = ({ videoRef }: Props) => {
  const { id: videoId } = useAppSelector((state) => state.video);
  const videoQuality = useAppSelector((state) => state.videoQuality.quality);
  const dispatch = useAppDispatch();
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
      {/* 임시 품질 변환 */}
      <div onClick={() => dispatch(setVideoQuality('low'))}>Change Low</div>
      <div onClick={() => dispatch(setVideoQuality('medium'))}>
        Change Medium
      </div>
      <div onClick={() => dispatch(setVideoQuality('high'))}>Change High</div>
    </div>
  );
};

export default VideoPlayer;
