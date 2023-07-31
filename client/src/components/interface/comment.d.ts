interface IComment {
  id: number;
  content: string;
  createAt: Date;
}

type TCloudCommentSpeed = 'slow' | 'medium' | 'fast';

interface ICloudComment extends IComment {
  displayTime: number; // 시간
  displayHeight: number; // 높이 (%)
  displaySize: number; // 크기 (font)
  speed: TCloudCommentSpeed;
}
