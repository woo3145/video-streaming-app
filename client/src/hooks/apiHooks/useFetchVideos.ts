import { useCallback, useEffect } from 'react';
import { fetchVideos } from 'services/videos';
import {
  setVideoList,
  startFetchVideoList,
} from 'store/modules/videoListSlice';
import { useAppDispatch, useAppSelector } from 'store/store';
import { getFileNameWithoutExtension } from 'utils/commonUtils';

/** Video 목록을 요청하는 커스텀 훅 */
const useFetchVideos = () => {
  const dispatch = useAppDispatch();
  const { lastFetched } = useAppSelector((state) => state.videoList);

  const generateThumbnailUrl = useCallback((videoSrc: string) => {
    const fileName = getFileNameWithoutExtension(videoSrc);
    const thumbnailUrl = `${process.env.REACT_APP_RESOURCE_URL}/thumbnails/${fileName}_thumbnail.0000000.jpg`;
    return thumbnailUrl;
  }, []);

  useEffect(() => {
    const currentTime = Date.now();
    const fiveMinutesInMilliseconds = 5 * 60 * 1000;
    // 최근 비디오 목록 요청시간에서 5분이 안지났다면 요청 X
    if (lastFetched && currentTime - lastFetched < fiveMinutesInMilliseconds)
      return;

    // console.log('비디오 목록 요청 및 리덕스 저장');
    const fetch = async () => {
      try {
        dispatch(startFetchVideoList());
        const videos = await fetchVideos();
        dispatch(
          setVideoList(
            videos.map((video) => {
              const thumbnail = generateThumbnailUrl(video.src);
              return {
                ...video,
                thumbnail,
              } as IVideoWithThumbnail;
            })
          )
        );
      } catch (e) {
        if (e instanceof Error) {
          console.log(e);
        }
      }
    };
    fetch();
  }, [dispatch, generateThumbnailUrl, lastFetched]);
};

export default useFetchVideos;
