interface IComment {
  id: string;
  createdAt: string;
  videoId: number;
  content: string;
  nickname: string;
  isCreatedLocal?: boolean; // 로컬에서 추가 된 댓글 또는 구름 (색칠하기 위함)
}

type TCloudCommentSpeed = 'slow' | 'medium' | 'fast';
type TCloudCommentSize = 'small' | 'medium' | 'large';
type TCloudCommentHeight = 'low' | 'medium' | 'high';

interface ICloudComment extends IComment {
  displayTime: number; // 시간
  displayHeight: number; // 높이 (%)
  displaySize: TCloudCommentSize; // 크기 (font)
  displaySpeed: TCloudCommentSpeed;
}

interface ICloudCommentWithPassword extends ICloudComment {
  password: string;
}
interface ICommentWithPassword extends IComment {
  password: string;
}
