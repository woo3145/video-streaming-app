import { BsFillPlayFill, BsPauseFill } from 'react-icons/bs';

import { setIsPlaying } from '../../store/modules/videoSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';

interface Props {
  onClick: (isPlaying: boolean) => void;
}

const VideoPlayButton = ({ onClick }: Props) => {
  const dispatch = useAppDispatch();
  const { isPlaying } = useAppSelector((state) => state.video);

  const onClickHandler = () => {
    onClick(!isPlaying);
    dispatch(setIsPlaying(!isPlaying));
  };
  return (
    <div
      onClick={onClickHandler}
      className="flex items-center justify-center w-8 h-8 rounded-md text-xl cursor-pointer duration-300 hover:bg-gray-700"
    >
      {isPlaying ? <BsPauseFill /> : <BsFillPlayFill />}
    </div>
  );
};

export default VideoPlayButton;
