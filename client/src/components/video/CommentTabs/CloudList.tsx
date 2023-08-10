import { RefObject } from 'react';
import { useAppSelector } from '../../../store/store';
import { useVideoSeek } from 'src/hooks/video/useVideoSeek';

interface Props {
  videoRef: RefObject<HTMLVideoElement>;
}

const CloudList = ({ videoRef }: Props) => {
  const { setCurrentVideoTime } = useVideoSeek(videoRef);
  const { clouds } = useAppSelector((state) => state.clouds);

  return (
    <ul className="text-lg 2xl:max-h-[400px] overflow-y-scroll">
      {clouds.map((cloud, idx) => {
        return (
          <li
            key={idx}
            className="py-2 px-4 hover:bg-gray-200 cursor-pointer duration-200 truncate hover:whitespace-normal"
            onClick={() => setCurrentVideoTime(cloud.displayTime)}
          >
            {cloud.content}
          </li>
        );
      })}
    </ul>
  );
};

export default CloudList;
