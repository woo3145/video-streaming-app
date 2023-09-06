import React, { useEffect } from 'react';
import { Button } from 'components/atoms/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadio,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from 'components/atoms/DropdownMenu';
import { setVideoQuality } from 'store/modules/videoQualitySlice';
import { useAppDispatch, useAppSelector } from 'store/store';
import Hls from 'hls.js';

const QualityButton = () => {
  const dispatch = useAppDispatch();
  const quality = useAppSelector((state) => state.videoQuality.quality);
  const isHlsSupported = Hls.isSupported();

  useEffect(() => {
    if (isHlsSupported) {
      dispatch(setVideoQuality('auto'));
    }
  }, [dispatch, isHlsSupported]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button type="button" variant="ghost">
          {quality === 'auto' ? 'Auto' : `${quality}p`}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuRadio
          value={`${quality}p`}
          setValue={(value: string) =>
            dispatch(setVideoQuality(value as TVideoQuality))
          }
        >
          <DropdownMenuRadioItem value="360">360p</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="480">480p</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="720">720p</DropdownMenuRadioItem>
          {isHlsSupported && (
            <DropdownMenuRadioItem value="auto">Auto</DropdownMenuRadioItem>
          )}
        </DropdownMenuRadio>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default QualityButton;
