import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMockVideo } from '../hooks/useMockVideo';
import { useAppDispatch } from '../store/store';
import { setVideoSrc } from '../store/modules/videoSlice';
import VideoPlayer from '../components/VideoPlayer';
import VideoMetadata from '../components/VideoMetadata';
import CommentsSection from '../components/CommentsSection/CommentsSection';
import CloudCommentOverlay from '../components/CloudCommentOverlay';

const Watch = () => {
  const { videoId } = useParams();
  const { data: video } = useMockVideo(videoId);
  const dispatch = useAppDispatch();

  // videoSrc 리덕스에 저장
  useEffect(() => {
    if (video?.src) {
      dispatch(setVideoSrc(video.src));
    }
  }, [dispatch, video?.src]);

  return (
    <div>
      <div className="flex gap-6 p-6">
        {/* Left */}
        <div className="w-full">
          <VideoPlayer />
          <VideoMetadata title={video?.title || ''} />
        </div>
        {/* Right */}
        <div className="w-[400px] h-[70vh] shrink-0 border rounded-lg">
          <CommentsSection />
        </div>

        {/* Overlay */}
        <CloudCommentOverlay />
      </div>
    </div>
  );
};

export default Watch;
