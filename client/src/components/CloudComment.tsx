import React from 'react';

interface Props {
  cloudComment: ICloudComment;
  left: string;
}

const CloudComment = React.memo(({ cloudComment, left }: Props) => {
  const { id, content, displaySize, displayHeight } = cloudComment;
  return (
    <div
      key={id}
      className="text-white font-bold"
      style={{
        fontSize: displaySize,
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

export default CloudComment;
