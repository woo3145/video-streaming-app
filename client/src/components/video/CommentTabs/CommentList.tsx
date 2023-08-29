import { useAppSelector } from 'store/store';
import CommentListItem from './CommentListItem';
import { useMemo } from 'react';

const CommentList = () => {
  const { comments: _comments } = useAppSelector((state) => state.comments);
  const { id: videoId } = useAppSelector((state) => state.video);

  const comments = useMemo(() => {
    return _comments[videoId]?.data || [];
  }, [_comments, videoId]);

  return (
    <ul className="text-lg xl:max-h-[400px] overflow-y-scroll">
      {comments.map((comment) => {
        return <CommentListItem key={comment.id} comment={comment} />;
      })}
    </ul>
  );
};

export default CommentList;
