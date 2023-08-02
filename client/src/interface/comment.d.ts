interface IComment {
  id: string;
  createdAt: string;
  videoTitle: string;
  content: string;
  nickname: string;
}

type TCloudCommentSpeed = 'slow' | 'medium' | 'fast';
type TCloudCommentSize = 'small' | 'medium' | 'large';

interface ICloudComment extends IComment {
  displayTime: number; // 시간
  displayHeight: number; // 높이 (%)
  displaySize: TCloudCommentSize; // 크기 (font)
  displaySpeed: TCloudCommentSpeed;
}
