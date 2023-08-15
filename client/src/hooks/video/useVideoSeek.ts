import { RefObject, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentTime } from 'store/modules/videoSlice';

// 비디오 구간 변경 hook
export const useVideoSeek = (videoRef: RefObject<HTMLVideoElement>) => {
  const dispatch = useDispatch();

  const setCurrentVideoTime = useCallback(
    (newTime: number) => {
      const videoElement = videoRef.current;
      if (!videoElement) return;
      dispatch(setCurrentTime(newTime));
      videoElement.currentTime = newTime;
    },
    [dispatch, videoRef]
  );

  return { setCurrentVideoTime };
};
