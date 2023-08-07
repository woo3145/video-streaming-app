interface IVideo {
  id: number;
  title: string;
  src: string;
}

interface IVideoWithThumbnail extends IVideo {
  thumbnail: string;
}

type TVideoQuality = 'low' | 'medium' | 'high';
