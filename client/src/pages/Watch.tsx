import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import CommentTabs from 'components/video/CommentTabs/CommentTabs';
import Metadata from 'components/video/VideoPlayer/Metadata';
import Player from 'components/video/VideoPlayer/Player';
import { setVideo } from 'store/modules/videoSlice';
import { useAppDispatch, useAppSelector } from 'store/store';
import useFetchComments from 'hooks/apiHooks/useFetchComments';
import useFetchClouds from 'hooks/apiHooks/useFetchClouds';
import useFetchVideos from 'hooks/apiHooks/useFetchVideos';

const Watch = () => {
  const { videoId } = useParams();
  const { videos, isLoading } = useAppSelector((state) => state.videoList);
  const video = videos.find((v) => v.id === parseInt(videoId || ''));

  const videoRef = useRef<HTMLVideoElement>(null);
  const dispatch = useAppDispatch();

  // videoId 리덕스에 저장
  useEffect(() => {
    if (!video) return;
    if (video.id !== 0) {
      dispatch(setVideo(video));
    }
  }, [dispatch, video]);

  useFetchVideos();
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
      <div className="flex flex-wrap gap-6 xl:p-6 xl:flex-nowrap pb-20">
        {/* Left */}
        <div className="w-full">
          <div className="relative overflow-hidden">
            <Player videoRef={videoRef} />
          </div>
          <Metadata title={video?.title || ''} />
        </div>

        {/* Right */}
        <div className="w-full h-auto xl:w-[600px] shrink-0 rounded-lg">
          <CommentTabs videoRef={videoRef} />
        </div>
      </div>
    </div>
  );
};

export default Watch;
