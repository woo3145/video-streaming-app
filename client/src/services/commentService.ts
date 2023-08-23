import { CLOUD_MAX_LENGTH, CLOUD_MIN_LENGTH } from 'constants/lengthLimits';
import { validateLength, validateUser } from 'utils/validation';
import bcrypt from 'bcryptjs';
import { CustomError } from 'errors/CustomError';
import CommentRepository, {
  SaveCommentInput,
} from 'repositories/CommentRepository';

//** 데이터를 검증하고 비즈니스 로직을 처리하는 책임을 가짐 */

const commentRepository = new CommentRepository();

export const fetchComments = async (
  videoId: number
): Promise<IComment[] | undefined> => {
  return await commentRepository.fetch(videoId);
};

export const saveComment = async (saveCommentInput: SaveCommentInput) => {
  const { nickname, password, content } = saveCommentInput;

  const validationResultForUser = validateUser(nickname, password);
  if (validationResultForUser) {
    throw validationResultForUser;
  }
  const validationResultForContent = validateLength(
    content,
    CLOUD_MIN_LENGTH,
    CLOUD_MAX_LENGTH,
    '내용'
  );
  if (validationResultForContent) {
    throw validationResultForContent;
  }

  return await commentRepository.save(saveCommentInput);
};

export const deleteComment = async (commentId: string, password: string) => {
  const commentData = await commentRepository.fetchOneWithPassword(commentId);

  if (!commentData) {
    throw new CustomError('댓글이 존재하지 않습니다.');
  }

  const passwordMatch = await bcrypt.compare(password, commentData.password);
  if (!passwordMatch) {
    throw new CustomError('비밀번호가 일치하지 않습니다.');
  }
  return await commentRepository.delete(commentId);
};
