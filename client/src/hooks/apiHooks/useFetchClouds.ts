import { useEffect } from 'react';
import { setClouds } from 'store/modules/cloudSlice';
import { useAppDispatch } from 'store/store';
import { fetchClouds } from 'utils/services/clouds';

/** Video의 구름댓글을 요청하고 redux에 저장하는 훅 */
const useFetchClouds = (videoId: number | undefined) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (videoId === undefined || videoId === 0) return;

    const fetch = async () => {
      const videoClouds = await fetchClouds(videoId).catch((e) => {
        console.log('Failed to fetch Comments');
        return null;
      });

      if (videoClouds) {
        dispatch(setClouds(videoClouds));
      }
    };

    fetch();
  }, [dispatch, videoId]);
};

export default useFetchClouds;
