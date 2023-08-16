import { cn } from 'utils/twUtils';

interface Props {
  comment: IComment;
}

const CommentListItem = ({ comment }: Props) => {
  return (
    <li
      className={cn(
        'py-2 px-4 hover:bg-gray-200 cursor-pointer duration-200 truncate hover:whitespace-normal',
        comment.isCreatedLocal && 'text-primary font-bold'
      )}
    >
      {comment.content}
    </li>
  );
};

export default CommentListItem;
