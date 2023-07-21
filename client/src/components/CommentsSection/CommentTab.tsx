import { Dispatch, SetStateAction } from 'react';
import { CommentTabType } from './CommentsSection';

interface Props {
  tab: CommentTabType;
  setTab: Dispatch<SetStateAction<CommentTabType>>;
}

const CommentTabs = ({ tab, setTab }: Props) => {
  const selectedStyle = 'border-b-4 border-purple-500';
  return (
    <div className="flex text-lg font-semibold">
      <div
        onClick={() => setTab('Comment')}
        className={`flex justify-center items-center w-full py-2 cursor-pointer hover:bg-gray-200 ${
          tab === 'Comment' ? selectedStyle : ''
        }`}
      >
        💬 댓글
      </div>
      <div
        onClick={() => setTab('Cloud')}
        className={`flex justify-center items-center w-full py-2 cursor-pointer hover:bg-gray-200 ${
          tab === 'Cloud' ? selectedStyle : ''
        }`}
      >
        ☁️ 구름
      </div>
    </div>
  );
};

export default CommentTabs;
