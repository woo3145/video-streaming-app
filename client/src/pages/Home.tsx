import React from 'react';
import { useMockVideos } from '../hooks/useMockVideos';
import VideoCard from '../components/VideoCard';

const Home = () => {
  const { data } = useMockVideos();

  return (
    <div className="pt-8">
      <div
        className="flex flex-col gap-4
      md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6"
      >
        {data.map((video, idx) => {
          return (
            <VideoCard
              key={idx}
              id={video.id.toString()}
              thumbnailUrl={video.thumbnailUrl}
              title={video.title}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
