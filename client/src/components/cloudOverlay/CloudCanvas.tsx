import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useAppSelector } from 'store/store';
import { cn } from 'utils/twUtils';

/** Improved - 구름 댓글 기능 (댓글이 displayTime에 오른쪽에서 생성되어 speed초에 왼쪽끝에 닿음) */
export const CloudCanvas = () => {
  const { clouds: _clouds } = useAppSelector((state) => state.clouds);
  const {
    id: videoId,
    currentTime,
    videoWidth,
    videoHeight,
  } = useAppSelector((state) => state.video);

  const clouds = useMemo(() => {
    return _clouds[videoId]?.data || [];
  }, [_clouds, videoId]);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 구름이 지나가는 속도의 second(초)를 정함
  const speeds = useMemo(() => {
    return {
      slow: 9,
      medium: 6,
      fast: 4,
    };
  }, []);
  // 구름의 크기 비율을 정함
  const sizes = useMemo(() => {
    return {
      small: '1em',
      medium: '1.5em',
      large: '2em',
    };
  }, []);
  const visibleClouds = clouds.filter((cloud) => {
    return (
      cloud.displayTime <= currentTime &&
      currentTime <= cloud.displayTime + speeds[cloud.displaySpeed] + 3 // 댓글이 사라지기 까지 여유시간
    );
  });

  const calculateX = useCallback(
    (cloud: ICloudComment) => {
      const elapsed = currentTime - cloud.displayTime; // 경과된 시간
      const progressRatio = elapsed / speeds[cloud.displaySpeed];
      if (!videoWidth) return 0;
      const positionX = (1 - progressRatio) * videoWidth;
      return positionX;
    },
    [speeds, currentTime, videoWidth]
  );
  const updateCanvas = useCallback(
    (cloud: ICloudComment, x: number) => {
      const ctx = canvasRef.current?.getContext('2d');
      if (!ctx) return;
      const y = videoHeight * (cloud.displayHeight / 100) + 28; // text가 안짤리도록 여유 픽셀더함(padding-top)

      const newFont = `bold ${sizes[cloud.displaySize]} Arial`;
      if (ctx.font !== newFont) ctx.font = newFont;

      const newColor = cloud.isCreatedLocal
        ? 'hsl(262.1 83.3% 57.8%)'
        : 'white';
      if (ctx.fillStyle !== newColor) ctx.fillStyle = newColor;

      ctx.fillText(cloud.content, x, y);
    },
    [videoHeight, sizes]
  );

  // currentTime이 업데이트 될때마다 캔버스 지우기
  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, videoWidth, videoHeight);

    visibleClouds.forEach((cloud) => {
      updateCanvas(cloud, calculateX(cloud));
    });
  }, [
    videoWidth,
    videoHeight,
    clouds,
    calculateX,
    updateCanvas,
    visibleClouds,
  ]);

  // 캔버스에 계산된 구름 그리기

  return (
    <div
      className={cn(
        'absolute top-0 left-0 text-lg pointer-events-none min-w-full',
        'text-sm md:text-base lg:text-lg xl:text-sm 2xl:text-base 3xl:text-xl'
      )}
    >
      <canvas ref={canvasRef} width={videoWidth} height={videoHeight} />
    </div>
  );
};
