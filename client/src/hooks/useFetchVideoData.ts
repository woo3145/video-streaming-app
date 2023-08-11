import { useEffect } from 'react';
import { useAppDispatch } from '../store/store';
import { fetchComments } from '../utils/services/comments';
import { fetchClouds } from '../utils/services/clouds';
import { setComments } from '../store/modules/commentsSlice';
import { setClouds } from '../store/modules/cloudSlice';

/** Video의 댓글과 구름을 요청하고 redux에 저장합니다. */
const useFetchVideoData = (videoId: number | undefined) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (videoId === undefined || videoId === 0) return;
    const fetch = async () => {
      const requsetComments = fetchComments(videoId).catch((e) => {
        console.log('Failed to fetch Comments');
        return null;
      });
      const requestClouds = fetchClouds(videoId).catch((e) => {
        console.log('Failed to fetch Clouds');
        return null;
      });
      const [videoComments, videoClouds] = await Promise.all([
        requsetComments,
        requestClouds,
      ]);
      if (videoComments) {
        dispatch(setComments(videoComments));
      }
      if (videoClouds) {
        dispatch(setClouds(videoClouds));
      }
    };

    fetch();
  }, [dispatch, videoId]);
};

export default useFetchVideoData;
