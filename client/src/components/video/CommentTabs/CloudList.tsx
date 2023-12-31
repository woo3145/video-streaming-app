import { useVideoSeek } from 'hooks/videoHooks/useVideoSeek';
import { RefObject, useMemo } from 'react';
import { useAppSelector } from 'store/store';
import CloudListItem from './CloudListItem';

interface Props {
  videoRef: RefObject<HTMLVideoElement>;
}

const CloudList = ({ videoRef }: Props) => {
  const { setCurrentVideoTime } = useVideoSeek(videoRef);
  const { video } = useAppSelector((state) => state.video);
  const { clouds: _clouds } = useAppSelector((state) => state.clouds);

  const clouds = useMemo(() => {
    if (!video) return [];
    return _clouds[video.id]?.data || [];
  }, [_clouds, video]);

  const sortedClouds = useMemo(() => {
    return [...clouds].sort((a, b) => a.displayTime - b.displayTime);
  }, [clouds]);

  return (
    <ul className="text-lg xl:max-h-[400px] overflow-y-scroll">
      {sortedClouds.map((cloud, idx) => {
        return (
          <CloudListItem
            key={cloud.id}
            cloud={cloud}
            onClick={() => {
              setCurrentVideoTime(cloud.displayTime);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        );
      })}
    </ul>
  );
};

export default CloudList;
