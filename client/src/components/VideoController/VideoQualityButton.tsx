import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';

const VideoQualityButton = () => {
  const dispatch = useAppDispatch();
  const quality = useAppSelector((state) => state.videoQuality.quality);

  const text: { [key in TVideoQuality]: string } = {
    low: '320p',
    medium: '640p',
    high: '720p',
  };

  return (
    <div
      onClick={() => {}}
      className="flex items-center justify-center py-2 px-4 rounded-md text-md cursor-pointer duration-300 hover:bg-gray-700"
    >
      {text[quality]}
    </div>
  );
};

export default VideoQualityButton;
