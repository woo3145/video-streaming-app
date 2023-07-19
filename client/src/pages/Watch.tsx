import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMockVideo } from '../hooks/useMockVideo';
import { useAppDispatch } from '../store/store';
import { setVideoSrc } from '../store/modules/videoSlice';
import VideoPlayer from '../components/VideoPlayer';

const Watch = () => {
  const { videoId } = useParams();
  const { data } = useMockVideo(videoId);
  const dispatch = useAppDispatch();

  // videoSrc 리덕스에 저장
  useEffect(() => {
    if (data?.src) {
      dispatch(setVideoSrc(data.src));
    }
  }, [dispatch, data?.src]);

  return (
    <div>
      <div className="w-full text-3xl font-bold">Watch {data?.title}</div>
      <VideoPlayer />
    </div>
  );
};

export default Watch;
