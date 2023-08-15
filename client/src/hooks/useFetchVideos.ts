import { useEffect, useState } from 'react';
import { fetchVideos } from 'utils/services/videos';

/** 비디오 목록을 요청합니다. */
const useFetchVideos = () => {
  const [videos, setVideos] = useState<IVideoWithThumbnail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // 마운트 상태를 추적하여 api 요청 처리전에 언마운트시 추가 작업을 못하도록 방어
    let isMounted = true;

    const fetch = async () => {
      try {
        const videos = await fetchVideos();
        if (isMounted) {
          setVideos(
            videos.map((video) => {
              const thumbnail = `http://localhost:4000/thumbnail/thumbnail-${video.id}.jpg`;
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
  }, []);

  return { videos, isLoading, error };
};

export default useFetchVideos;
