import DeleteCommentModal from 'components/modals/DeleteCommentModal';
import { useState } from 'react';
import { IoIosRemoveCircleOutline } from 'react-icons/io';
import { dateStringToFormattedString } from 'utils/dateUtils';
import { cn } from 'utils/twUtils';

interface Props {
  comment: IComment;
}

const CommentListItem = ({ comment }: Props) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteButtonClick = () => {
    openDeleteModal();
  };
  return (
    <li className={cn('flex items-stretch')}>
      <div
        className={cn(
          'w-full px-2 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer'
        )}
      >
        <div className="flex items-center gap-4 mb-1">
          <p className="font-bold">🧑‍💻 {comment.nickname}</p>
          <p className="text-sm">
            {dateStringToFormattedString(comment.createdAt)}
          </p>
        </div>
        <p
          className={cn(
            comment.isCreatedLocal &&
              'text-primary font-bold hover:text-primary'
          )}
        >
          {comment.content}
        </p>
      </div>
      <div
        onClick={handleDeleteButtonClick}
        className="flex items-center justify-center shrink-0 px-2 text-destructive cursor-pointer hover:bg-accent hover:text-accent-foreground"
      >
        <IoIosRemoveCircleOutline />
      </div>
      {isDeleteModalOpen && (
        <DeleteCommentModal
          onRequestClose={closeDeleteModal}
          commentId={comment.id}
        />
      )}
    </li>
  );
};

export default CommentListItem;
