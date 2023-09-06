import { BsGithub } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="flex items-center justify-center gap-4 w-full border-t px-4 py-4 text-sm">
      <span className="flex items-center">
        <BsGithub className="mb-1 mr-1" />
        <Link
          to="https://github.com/woo3145/video-streaming-app"
          target="_blank"
          rel="noopener noreferrer"
          className="border-b ml-1 border-foreground/30"
        >
          GitHub
        </Link>
      </span>
      <div>‧</div>
      <span className="">
        <Link
          className="border-b mr-1 border-foreground/30"
          target="_blank"
          to="https://icons8.com/icon/22skWjUReayF/video"
          rel="noopener noreferrer"
        >
          Video
        </Link>
        icon by
        <Link
          className="border-b ml-1 border-foreground/30"
          target="_blank"
          to="https://icons8.com"
          rel="noopener noreferrer"
        >
          Icons8
        </Link>
      </span>
    </footer>
  );
};

export default Footer;
