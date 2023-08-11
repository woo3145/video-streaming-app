import React, { useEffect, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../store/store';
import { setVideoId, setVideoSrc } from '../store/modules/videoSlice';
import Metadata from '../components/video/VideoPlayer/Metadata';
import CommentTabs from '../components/video/CommentTabs/CommentTabs';
import useFetchVideoData from '../hooks/useFetchVideoData';
import useFetchVideos from '../hooks/useFetchVideos';
import CloudOverlay from 'src/components/cloudOverlay/CloudOverlay';
import Player from '../components/video/VideoPlayer/Player';

const Watch = () => {
  const { videoId } = useParams();
  const { videos } = useFetchVideos();
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

  // videoSrc 리덕스에 저장
  useEffect(() => {
    if (!video) return;
    if (video.src) {
      dispatch(setVideoSrc(video.src));
    }
    if (video.id) {
      dispatch(setVideoId(video.id));
    }
  }, [dispatch, video]);

  useFetchVideoData(video?.id);

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
