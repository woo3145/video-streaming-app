import { useCallback, useEffect, useRef, useState } from 'react';
import { BsVolumeMuteFill, BsVolumeUpFill } from 'react-icons/bs';
import { useAppSelector } from 'store/store';
import { cn } from 'utils/twUtils';

interface Props {
  onClickVolume: (newVolume: number) => void;
  onClickMute: (isMuted: boolean) => void;
}

const VolumeController = ({ onClickVolume, onClickMute }: Props) => {
  const { volume, isMuted } = useAppSelector((state) => state.video);
  const [isDragging, setIsDragging] = useState(false); // 드래그중인 상태인지 기록

  const progressBarRef = useRef<HTMLDivElement>(null);

  const onClickMuteHandler = () => {
    onClickMute(!isMuted);
  };

  // 클릭한 지점을 계산하여 외부에서 들어온 onClickVolume 함수에 계산된 ratio값으로 콜백
  const setVolume = useCallback(
    (e: MouseEvent) => {
      const volumeBar = progressBarRef.current;
      if (!volumeBar) return;
      const { left, width } = volumeBar.getBoundingClientRect();
      let x = e.pageX - left;
      if (x < 0) x = 0;
      const ratio = x / width;
      const newVolume = Math.min(Math.max(ratio, 0), 1);
      onClickVolume(newVolume);
    },
    [onClickVolume]
  );

  const mouseDownHandler = useCallback(() => {
    setIsDragging(true);
  }, []);

  const mouseMoveHandler = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault();
        setVolume(e);
      }
    },
    [isDragging, setVolume]
  );
  const mouseUpHandler = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      setVolume(e);
      setIsDragging(false);
    },
    [isDragging, setVolume]
  );

  // 드래그중 요소를 나가도 드래그를 유지할 수 있도록 window에 핸들러 등록
  useEffect(() => {
    window.addEventListener('mousemove', mouseMoveHandler);
    window.addEventListener('mouseup', mouseUpHandler);

    return () => {
      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('mouseup', mouseUpHandler);
    };
  }, [mouseMoveHandler, mouseUpHandler]);

  const volumeWidth = `${volume * 100}%`;

  return (
    <div className="group hidden md:flex items-center">
      <div
        className="flex items-center justify-center shrink-0 w-8 h-8 rounded-md text-xl cursor-pointer hover:bg-accent hover:text-accent-foreground duration-300"
        onClick={onClickMuteHandler}
      >
        {isMuted || volume === 0 ? <BsVolumeMuteFill /> : <BsVolumeUpFill />}
      </div>

      {/* 호버시 볼륨 슬라이드 보임 */}
      <div
        className={cn(
          'relative flex items-center w-0 h-8 cursor-pointer group-hover:w-24 group-hover:mx-4 duration-200',
          isDragging && 'w-24 mx-4'
        )}
        ref={progressBarRef}
        onMouseDown={mouseDownHandler}
      >
        <div className="absolute left-0 w-full h-1 bg-white rounded-full" />
        <div
          style={{ width: isMuted ? 0 : volumeWidth }}
          className="absolute left-0 h-1 bg-primary rounded-full"
        />
        <div
          style={{
            left: isMuted ? 0 : volumeWidth,
          }}
          className={cn(
            'absolute h-0 w-0 top-1/2 -mt-2 bg-primary rounded-full group-hover:w-4 group-hover:h-4 -translate-x-2',
            isDragging && 'w-4 h-4'
          )}
        />
      </div>
    </div>
  );
};

export default VolumeController;
