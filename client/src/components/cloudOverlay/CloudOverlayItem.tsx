import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from 'utils/twUtils';

const cloudItemVariants = cva(
  'text-white drop-shadow-lg shadow-black font-bold',
  {
    variants: {
      size: {
        small: 'text-md md:text-lg lg:text-xl xl:text-lg 2xl:text-xl',
        medium: 'text-xl md:text-2xl lg:text-3xl xl:text-2xl 2xl:text-3xl',
        large: 'text-2xl md:text-3xl lg:text-4xl xl:text-3xl 2xl:text-4xl',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  }
);

interface Props {
  cloudComment: ICloudComment;
  left: string;
}

const CloudOverlayItem = React.memo(({ cloudComment, left }: Props) => {
  const { id, content, displaySize, displayHeight, isCreatedLocal } =
    cloudComment;

  return (
    <div
      key={id}
      className={cn(
        cloudItemVariants({ size: displaySize }),
        isCreatedLocal && 'text-primary'
      )}
      style={{
        position: 'absolute',
        top: `${displayHeight}%`,
        left: left,
        whiteSpace: 'nowrap',
      }}
    >
      {content}
    </div>
  );
});

export default CloudOverlayItem;
