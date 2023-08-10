import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../../../store/store';
import VideoBufferedBar from './BufferedBar';

interface Props {
  onClick: (time: number) => void;
  togglePlayPause: (isPlaying: boolean) => void;
}

const ProgressBar = ({ onClick, togglePlayPause }: Props) => {
  const { duration, currentTime, isPlaying } = useAppSelector(
    (state) => state.video
  );
  const [prevIsPlaying, setPrevIsPlaying] = useState(false); // 드래그 하기 전 isPlaying 값 기록
  const [isDragging, setIsDragging] = useState(false); // 드래그중인 상태인지 기록

  const progressBarRef = useRef<HTMLDivElement>(null);

  // 이벤트의 지점에서 계산하여 외부에서 들어온 onClick 함수에 계산된 newTime값으로 콜백
  const setCurrentTime = useCallback(
    (e: MouseEvent) => {
      const progressBar = progressBarRef.current;
      if (!progressBar) return;
      // progressBar의 시작지점으로 부터 클릭지점이 얼마나 떨어져 있는지 구함
      let x = e.pageX - progressBar.getBoundingClientRect().left;
      if (x < 0) x = 0;
      if (progressBar.offsetWidth < x) x = progressBar.offsetWidth;
      // 선택한 지점의 비율값을 구함
      const ratio = x / progressBar.offsetWidth;
      // 재생해야할 시간값을 구함
      const newTime = ratio * duration;
      onClick(newTime);
    },
    [duration, onClick]
  );

  const mouseDownHandler = useCallback(() => {
    setPrevIsPlaying(isPlaying); // 이전 isPlaying 상태 기록
    setIsDragging(true);
    if (isPlaying) {
      togglePlayPause(false);
    }
  }, [isPlaying, togglePlayPause]);

  const mouseMoveHandler = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault();
        setCurrentTime(e);
      }
    },
    [isDragging, setCurrentTime]
  );
  const mouseUpHandler = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      setCurrentTime(e);
      setIsDragging(false);

      if (prevIsPlaying) {
        togglePlayPause(true); // 드래그가 끝나고 이전에 재생 상태였으면 다시 재생
      }
    },
    [isDragging, setCurrentTime, prevIsPlaying, togglePlayPause]
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

  return (
    <div
      className="relative w-full h-2 bg-white/20 cursor-pointer"
      ref={progressBarRef}
      onMouseDown={mouseDownHandler}
    >
      <VideoBufferedBar />
      <div
        style={{ width: `${(currentTime / duration) * 100}%` }}
        className="absolute top-0 left-0 h-2 bg-primary"
      />
    </div>
  );
};

export default ProgressBar;
