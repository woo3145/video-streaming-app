import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useMockVideo } from '../hooks/useMockVideo';
import { useAppDispatch } from '../store/store';
import { setVideoSrc } from '../store/modules/videoSlice';
import VideoPlayer from '../components/VideoPlayer';
import VideoMetadata from '../components/VideoMetadata';
import CloudCommentOverlay from '../components/CloudCommentOverlay';
import CommentsSection from '../components/CommentsSection/CommentsSection';

const Watch = () => {
  const { videoId } = useParams();
  const { data: video } = useMockVideo(videoId);
  const videoRef = useRef<HTMLVideoElement>(null);
  const dispatch = useAppDispatch();

  // videoSrc 리덕스에 저장
  useEffect(() => {
    if (video?.src) {
      dispatch(setVideoSrc(video.src));
    }
  }, [dispatch, video?.src]);

  return (
    <div>
      <div className="flex flex-wrap gap-6 p-6 2xl:flex-nowrap pb-20">
        {/* Left */}
        <div className="w-full">
          <div className="relative overflow-hidden">
            <VideoPlayer videoRef={videoRef} />
            {/* Overlay */}
            <CloudCommentOverlay />
          </div>
          <VideoMetadata title={video?.title || ''} />
        </div>

        {/* Right */}
        <div className="w-full h-auto 2xl:w-[600px] shrink-0 border rounded-lg">
          <CommentsSection videoRef={videoRef} />
        </div>
      </div>
    </div>
  );
};

export default Watch;
