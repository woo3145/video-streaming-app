import React from 'react';
import { useParams } from 'react-router-dom';

const Watch = () => {
  const { videoId } = useParams();
  return (
    <div>
      <div className="w-full text-3xl font-bold">Watch {videoId}</div>
    </div>
  );
};

export default Watch;
