import { useVideoSeek } from 'hooks/videoHooks/useVideoSeek';
import { RefObject, useMemo } from 'react';
import { useAppSelector } from 'store/store';
import CloudListItem from './CloudListItem';

interface Props {
  videoRef: RefObject<HTMLVideoElement>;
}

const CloudList = ({ videoRef }: Props) => {
  const { setCurrentVideoTime } = useVideoSeek(videoRef);
  const { clouds } = useAppSelector((state) => state.clouds);

  const sortedClouds = useMemo(() => {
    return [...clouds].sort((a, b) => a.displayTime - b.displayTime);
  }, [clouds]);

  return (
    <ul className="text-lg 2xl:max-h-[400px] overflow-y-scroll">
      {sortedClouds.map((cloud, idx) => {
        return (
          <CloudListItem
            key={cloud.id}
            cloud={cloud}
            onClick={() => setCurrentVideoTime(cloud.displayTime)}
          />
        );
      })}
    </ul>
  );
};

export default CloudList;
