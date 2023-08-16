import { IoIosRemoveCircleOutline } from 'react-icons/io';
import { dateStringToFormattedString } from 'utils/dateUtils';
import { cn } from 'utils/twUtils';

interface Props {
  comment: IComment;
}

const CommentListItem = ({ comment }: Props) => {
  return (
    <li
      className={cn(
        'flex items-stretch',
        comment.isCreatedLocal && 'text-primary font-bold'
      )}
    >
      <div
        className={cn(
          'w-full px-2 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer',
          comment.isCreatedLocal && 'hover:text-primary'
        )}
      >
        <div className="flex items-center gap-4 mb-1">
          <p className="font-bold">🧑‍💻 {comment.nickname}</p>
          <p className="text-sm">
            {dateStringToFormattedString(comment.createdAt)}
          </p>
        </div>
        <p>{comment.content}</p>
      </div>
      <div
        onClick={() => console.log('댓글 삭제', comment.id)}
        className="flex items-center justify-center shrink-0 px-2 text-destructive cursor-pointer hover:bg-accent hover:text-accent-foreground"
      >
        <IoIosRemoveCircleOutline />
      </div>
    </li>
  );
};

export default CommentListItem;
