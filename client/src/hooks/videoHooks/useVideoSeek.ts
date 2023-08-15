import { RefObject, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentTime } from 'store/modules/videoSlice';

//** 비디오의 구간을 변경하는 hook (Cloud 컴포넌트에서 사용해서 독립시킴) */
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
