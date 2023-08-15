import React, { useEffect, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import CloudOverlay from 'components/cloudOverlay/CloudOverlay';
import CommentTabs from 'components/video/CommentTabs/CommentTabs';
import Metadata from 'components/video/VideoPlayer/Metadata';
import Player from 'components/video/VideoPlayer/Player';
import { setVideoId } from 'store/modules/videoSlice';
import { useAppDispatch } from 'store/store';
import useFetchVideos from 'hooks/apiHooks/useFetchVideos';
import useFetchComments from 'hooks/apiHooks/useFetchComments';
import useFetchClouds from 'hooks/apiHooks/useFetchClouds';

const Watch = () => {
  const { videoId } = useParams();
  const { videos, isLoading } = useFetchVideos();
  const video = useMemo(() => {
    const filteredVideo = videos.filter(
      (v) => v.id === parseInt(videoId || '')
    );
    if (!filteredVideo.length) {
      return null;
    }
    return filteredVideo[0];
  }, [videos, videoId]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const dispatch = useAppDispatch();

  // videoId 리덕스에 저장
  useEffect(() => {
    if (!video) return;
    if (video.id !== 0) {
      dispatch(setVideoId(video.id));
    }
  }, [dispatch, video]);

  useFetchComments(video?.id);
  useFetchClouds(video?.id);

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  if (!video) {
    return <div>Not Found</div>;
  }
  return (
    <div>
      <div className="flex flex-wrap gap-6 p-6 2xl:flex-nowrap pb-20">
        {/* Left */}
        <div className="w-full">
          <div className="relative overflow-hidden">
            <Player videoRef={videoRef} />
            {/* Overlay */}
            <CloudOverlay />
          </div>
          <Metadata title={video?.title || ''} />
        </div>

        {/* Right */}
        <div className="w-full h-auto 2xl:w-[600px] shrink-0 border rounded-lg">
          <CommentTabs videoRef={videoRef} />
        </div>
      </div>
    </div>
  );
};

export default Watch;
