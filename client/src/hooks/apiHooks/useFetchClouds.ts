import { useEffect } from 'react';
import { fetchClouds } from 'services/cloudService';
import { setClouds } from 'store/modules/cloudSlice';
import { useAppDispatch, useAppSelector } from 'store/store';

/** Video의 구름댓글을 요청하고 redux에 저장하는 훅 */
const useFetchClouds = (videoId: number | undefined) => {
  const dispatch = useAppDispatch();
  const { clouds } = useAppSelector((state) => state.clouds);

  useEffect(() => {
    if (videoId === undefined || videoId === 0) return;

    const currentTime = Date.now();
    const fiveMinutesInMilliseconds = 5 * 60 * 1000;
    // 최근 구름 요청시간에서 5분이 안지났다면 요청 X
    if (
      clouds[videoId] &&
      currentTime - clouds[videoId].lastFetched < fiveMinutesInMilliseconds
    )
      return;

    const fetch = async () => {
      console.log('구름 요청');
      const videoClouds = await fetchClouds(videoId).catch((e) => {
        console.log('Failed to fetch Comments');
        return null;
      });

      if (videoClouds) {
        dispatch(setClouds({ videoId, clouds: videoClouds }));
      }
    };

    fetch();
  }, [dispatch, videoId, clouds]);
};

export default useFetchClouds;
