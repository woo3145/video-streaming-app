import { useAppSelector } from 'store/store';
import CommentListItem from './CommentListItem';
import { useMemo } from 'react';

const CommentList = () => {
  const { comments: _comments } = useAppSelector((state) => state.comments);
  const { video } = useAppSelector((state) => state.video);

  const comments = useMemo(() => {
    if (!video) return [];
    return _comments[video.id]?.data || [];
  }, [_comments, video]);

  return (
    <ul className="text-lg xl:max-h-[400px] overflow-y-scroll">
      {comments.map((comment) => {
        return <CommentListItem key={comment.id} comment={comment} />;
      })}
    </ul>
  );
};

export default CommentList;
