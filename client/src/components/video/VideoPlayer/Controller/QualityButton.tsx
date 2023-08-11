import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadio,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from 'src/components/atoms/DropdownMenu';
import { Button } from 'src/components/atoms/Button';
import { setVideoQuality } from 'src/store/modules/videoQualitySlice';

const QualityButton = () => {
  const dispatch = useAppDispatch();
  const quality = useAppSelector((state) => state.videoQuality.quality);

  const text: { [key in TVideoQuality]: string } = {
    low: '320p',
    medium: '640p',
    high: '720p',
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button type="button" variant="ghost">
          {text[quality]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuRadio
          value={quality}
          setValue={(value: string) =>
            dispatch(setVideoQuality(value as TVideoQuality))
          }
        >
          <DropdownMenuRadioItem value="low">320p</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="medium">640p</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="high">720p</DropdownMenuRadioItem>
        </DropdownMenuRadio>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default QualityButton;
