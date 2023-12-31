import VideoCard from 'components/video/VideoPlayer/VideoCard';
import useFetchVideos from 'hooks/apiHooks/useFetchVideos';
import { useAppSelector } from 'store/store';
import { cn } from 'utils/twUtils';

const Home = () => {
  const { videos, isLoading } = useAppSelector((state) => state.videoList);
  useFetchVideos();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="pt-8 px-2">
      <div
        className={cn(
          'grid grid-cols-1 gap-4 justify-center items-center',
          'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6'
        )}
      >
        {videos.length === 0 ? (
          <div>비디오가 없어요 😢</div>
        ) : (
          videos.map((video) => {
            return (
              <VideoCard
                key={video.id}
                id={video.id.toString()}
                thumbnailUrl={video.thumbnail}
                title={video.title}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Home;
