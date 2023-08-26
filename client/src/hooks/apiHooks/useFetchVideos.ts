import { useCallback, useEffect, useState } from 'react';
import { fetchVideos } from 'services/videos';
import { getFileNameWithoutExtension } from 'utils/commonUtils';

/** Video 목록을 요청하는 커스텀 훅 */
const useFetchVideos = () => {
  const [videos, setVideos] = useState<IVideoWithThumbnail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const generateThumbnailUrl = useCallback((videoSrc: string) => {
    const fileName = getFileNameWithoutExtension(videoSrc);
    const thumbnailUrl = `${process.env.REACT_APP_RESOURCE_URL}/thumbnails/${fileName}_thumbnail.0000000.jpg`;
    return thumbnailUrl;
  }, []);

  useEffect(() => {
    // 마운트 상태를 추적하여 api 요청 처리전에 언마운트시 추가 작업을 못하도록 방어
    let isMounted = true;

    const fetch = async () => {
      try {
        const videos = await fetchVideos();
        if (isMounted) {
          setVideos(
            videos.map((video) => {
              const thumbnail = generateThumbnailUrl(video.src);
              return {
                ...video,
                thumbnail,
              } as IVideoWithThumbnail;
            })
          );
        }
      } catch (e) {
        if (isMounted && e instanceof Error) {
          setError(e);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    fetch();

    return () => {
      isMounted = false;
    };
  }, [generateThumbnailUrl]);

  return { videos, isLoading, error };
};

export default useFetchVideos;
