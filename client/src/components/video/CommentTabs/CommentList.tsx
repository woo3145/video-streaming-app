import { useAppSelector } from 'store/store';
import CommentListItem from './CommentListItem';

const CommentList = () => {
  const { comments } = useAppSelector((state) => state.comments);
  const { id: videoId } = useAppSelector((state) => state.video);

  return (
    <ul className="text-lg xl:max-h-[400px] overflow-y-scroll">
      {(comments[videoId] || []).map((comment) => {
        return <CommentListItem key={comment.id} comment={comment} />;
      })}
    </ul>
  );
};

export default CommentList;
