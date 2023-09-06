interface IVideo {
  id: number;
  title: string;
  src: string;
}

interface IVideoWithThumbnail extends IVideo {
  thumbnail: string;
}

type TVideoQuality = '360' | '480' | '720' | 'auto';
