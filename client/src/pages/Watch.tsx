import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMockVideo } from '../hooks/useMockVideo';
import { useAppDispatch } from '../store/store';
import { setVideoSrc } from '../store/modules/videoSlice';
import VideoPlayer from '../components/VideoPlayer';
import VideoMetadata from '../components/VideoMetadata';

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
          <div className="flex text-lg font-semibold">
            <div className="flex justify-center items-center w-full py-2 cursor-pointer hover:bg-gray-200">
              💬 댓글
            </div>
            <div className="flex justify-center items-center w-full py-2 border-b-4 border-purple-500 cursor-pointer hover:bg-gray-200">
              ☁️ 구름
            </div>
          </div>
          <div className="text-lg">
            <div className="py-2 px-4 hover:bg-gray-200 cursor-pointer duration-200 truncate hover:whitespace-normal">
              댓글 1
            </div>
            <div className="py-2 px-4 hover:bg-gray-200 cursor-pointer duration-200 truncate hover:whitespace-normal">
              댓글 2 댓글 2 댓글 2 댓글 2 댓글 2 댓글 2 댓글 2 댓글 2 댓글 2
              댓글 2 댓글 2 댓글 2 댓글 2 댓글 2 댓글 2 댓글 2 댓글 2 댓글 2
              댓글 2 댓글 2 댓글 2 댓글 2 댓글 2 댓글 2 댓글 2 댓글 2 댓글 2
              댓글 2 댓글 2 댓글 2 댓글 2 댓글 2 댓글 2 댓글 2 댓글 2 댓글 2
              댓글 2 댓글 2
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;
