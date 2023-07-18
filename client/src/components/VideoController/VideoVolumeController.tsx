import { MouseEvent, useCallback } from 'react';
import { BsVolumeMuteFill, BsVolumeUpFill } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setIsMuted } from '../../store/modules/videoSlice';

interface Props {
  onClickVolume: (newVolume: number) => void;
  onClickMute: (isMuted: boolean) => void;
}

const VideoVolumeController = ({ onClickVolume, onClickMute }: Props) => {
  const { volume, isMuted } = useAppSelector((state) => state.video);
  const dispatch = useAppDispatch();

  // 클릭한 지점을 계산하여 외부에서 들어온 onClickVolume 함수에 계산된 ratio값으로 콜백
  const onClickVolumeHandler = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const volumeBar = e.currentTarget as HTMLDivElement;
      const { left, width } = volumeBar.getBoundingClientRect();
      const x = e.pageX - left;
      const ratio = x / width;
      onClickVolume(ratio);
    },
    [onClickVolume]
  );

  const onClickMuteHandler = () => {
    dispatch(setIsMuted(!isMuted));
    onClickMute(!isMuted);
  };

  const volumeWidth = `${volume * 100}%`;

  return (
    <div className="group flex items-center">
      <div
        className="flex items-center justify-center shrink-0 w-8 h-8 text-xl cursor-pointer duration-300 hover:bg-gray-300"
        onClick={onClickMuteHandler}
      >
        {isMuted ? <BsVolumeMuteFill /> : <BsVolumeUpFill />}
      </div>

      {/* 호버시 볼륨 슬라이드 보임 */}
      <div
        className="relative w-0 h-1 bg-gray-300 rounded-lg cursor-pointer group-hover:w-24 duration-200"
        onClick={onClickVolumeHandler}
      >
        <div
          style={{ width: isMuted ? 0 : volumeWidth }}
          className="absolute top-0 left-0 h-1 bg-purple-500 rounded-full"
        />
      </div>
    </div>
  );
};

export default VideoVolumeController;
