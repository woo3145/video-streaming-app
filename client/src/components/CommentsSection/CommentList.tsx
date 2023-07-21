interface Props {
  comments: { id: number; comment: string }[];
}

const CommentList = ({ comments }: Props) => {
  return (
    <ul className="text-lg">
      {comments.map((comment, idx) => {
        return (
          <li
            key={idx}
            className="py-2 px-4 hover:bg-gray-200 cursor-pointer duration-200 truncate hover:whitespace-normal"
          >
            {comment.comment}
          </li>
        );
      })}
    </ul>
  );
};

export default CommentList;
