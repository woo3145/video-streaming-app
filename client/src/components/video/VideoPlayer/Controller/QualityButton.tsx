import React from 'react';
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

const QualityButton = () => {
  const dispatch = useAppDispatch();
  const quality = useAppSelector((state) => state.videoQuality.quality);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button type="button" variant="ghost">
          {`${quality}p`}
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
        </DropdownMenuRadio>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default QualityButton;
