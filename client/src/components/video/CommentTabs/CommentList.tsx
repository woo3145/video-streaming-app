import { useAppSelector } from 'store/store';

const CommentList = () => {
  const { comments } = useAppSelector((state) => state.comments);

  return (
    <ul className="text-lg 2xl:max-h-[400px] overflow-y-scroll">
      {comments.map((comment, idx) => {
        return (
          <li
            key={idx}
            className="py-2 px-4 hover:bg-gray-200 cursor-pointer duration-200 truncate hover:whitespace-normal"
          >
            {comment.content}
          </li>
        );
      })}
    </ul>
  );
};

export default CommentList;
