import { useAppSelector } from 'store/store';
import CommentListItem from './CommentListItem';

const CommentList = () => {
  const { comments } = useAppSelector((state) => state.comments);

  return (
    <ul className="text-lg 2xl:max-h-[400px] overflow-y-scroll">
      {comments.map((comment) => {
        return <CommentListItem key={comment.id} comment={comment} />;
      })}
    </ul>
  );
};

export default CommentList;
