import { Link } from 'react-router-dom';

interface Props {
  id: string;
  thumbnailUrl: string;
  title: string;
}

const VideoCard = ({ thumbnailUrl, title, id }: Props) => {
  return (
    <Link
      to={`/watch/${id}`}
      className="flex flex-col w-full cursor-pointer transition-transform duration-200 hover:-translate-y-2"
    >
      <Thumbnail src={thumbnailUrl} alt={title} />
      <Title title={title} />
    </Link>
  );
};

function Thumbnail({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className="object-cover object-center h-80 max-h-72 rounded-lg
  md:h-64 xl:h-60"
    />
  );
}

function Title({ title }: { title: string }) {
  return <h3 className="text-2xl pt-2 font-semibold">{title}</h3>;
}

export default VideoCard;
