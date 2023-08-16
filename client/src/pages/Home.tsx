import VideoCard from 'components/video/VideoPlayer/VideoCard';
import useFetchVideos from 'hooks/apiHooks/useFetchVideos';
import React from 'react';

const Home = () => {
  const { videos, isLoading } = useFetchVideos();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="pt-8">
      <div
        className="flex flex-col gap-4
      md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6"
      >
        {videos.length === 0 && <div>비디오가 없어요 😢</div>}
        {videos.map((video, idx) => {
          return (
            <VideoCard
              key={idx}
              id={video.id.toString()}
              thumbnailUrl={video.thumbnail}
              title={video.title}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
