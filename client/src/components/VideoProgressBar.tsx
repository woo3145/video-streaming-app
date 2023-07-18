import { MouseEvent } from 'react';

interface Props {
  duration: number;
  currentTime: number;
  onClick: (time: number) => void;
}

const VideoProgressBar = ({ duration, currentTime, onClick }: Props) => {
  // 클릭한 지점을 계산하여 외부에서 들어온 onClick 함수에 계산된 newTime값으로 콜백
  const onClickHandler = (e: MouseEvent<HTMLDivElement>) => {
    const progressBar = e.target as HTMLDivElement;
    // progressBar의 시작지점으로 부터 클릭지점이 얼마나 떨어져 있는지 구함
    const x = e.pageX - progressBar.getBoundingClientRect().left;
    // 선택한 지점의 비율값을 구함
    const ratio = x / progressBar.offsetWidth;
    // 재생해야할 시간값을 구함
    const newTime = ratio * duration;
    onClick(newTime);
  };

  return (
    <div
      className="relative w-full h-2 bg-gray-700 cursor-pointer"
      onClick={onClickHandler}
    >
      <div
        style={{ width: `${(currentTime / duration) * 100}%` }}
        className="absolute top-0 left-0 h-2 bg-purple-500 rounded-full"
      />
    </div>
  );
};

export default VideoProgressBar;
