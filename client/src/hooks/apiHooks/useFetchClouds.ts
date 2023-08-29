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

    if (clouds[videoId]) return;

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
