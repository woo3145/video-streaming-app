import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from 'utils/twUtils';

interface Props {
  id: string;
  thumbnailUrl: string;
  title: string;
}

const VideoCard = ({ thumbnailUrl, title, id }: Props) => {
  return (
    <Link
      to={`/watch/${id}`}
      className="flex flex-col mx-auto w-full max-w-lg cursor-pointer transition-transform duration-200 hover:-translate-y-2"
    >
      <Thumbnail src={thumbnailUrl} alt={title} />
      <Title title={title} />
    </Link>
  );
};

function Thumbnail({ src, alt }: { src: string; alt: string }) {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return (
      <div
        className={cn(
          'object-cover object-center w-full h-0 pb-[56.25%] rounded-md bg-foreground/20'
        )}
      ></div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onLoad={() => setIsLoading(false)}
      className={cn('object-cover object-center w-full h-auto rounded-md')}
    />
  );
}

function Title({ title }: { title: string }) {
  return <h3 className="text-2xl pt-2 font-semibold">{title}</h3>;
}

export default VideoCard;
