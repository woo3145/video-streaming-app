import React from 'react';

interface Props {
  cloudComment: ICloudComment;
  left: string;
}

const CloudOverlayItem = React.memo(({ cloudComment, left }: Props) => {
  const { id, content, displaySize, displayHeight } = cloudComment;

  const sizes = {
    small: 20,
    medium: 28,
    large: 36,
  };
  return (
    <div
      key={id}
      className={`text-white font-bold`}
      style={{
        fontSize: sizes[displaySize],
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
