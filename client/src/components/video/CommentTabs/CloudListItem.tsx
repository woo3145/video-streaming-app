import { decimalToTimeString } from 'utils/dateUtils';
import { cn } from 'utils/twUtils';
import { IoIosRemoveCircleOutline } from 'react-icons/io';
import { BsFillSkipEndFill } from 'react-icons/bs';
import DeleteCloudModal from 'components/modals/DeleteCloudModal';
import { useState } from 'react';

interface Props {
  cloud: ICloudComment;
  onClick: () => void;
}

const CloudListItem = ({ cloud, onClick }: Props) => {
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
          'group flex items-center w-full px-2 py-2 gap-2 text-sm md:text-base 2xl:text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer',
          cloud.isCreatedLocal && 'hover:text-primary'
        )}
        onClick={onClick}
      >
        <p
          className={cn(
            'w-full pr-4 break-all',
            cloud.isCreatedLocal && 'text-primary font-bold'
          )}
        >
          {cloud.content}
        </p>
        <p className="shrink-0 w-20 md:w-28 truncate group-hover:whitespace-normal group-hover:break-all">
          🧑‍💻 {cloud.nickname}
        </p>
        <p className="shrink-0 w-16 text-right">
          {decimalToTimeString(cloud.displayTime)}
        </p>
        <p className="shrink-0 hidden pl-2 group-hover:block">
          <BsFillSkipEndFill />
        </p>
      </div>
      <div
        onClick={handleDeleteButtonClick}
        className="flex items-center justify-center shrink-0 px-2 text-destructive cursor-pointer hover:bg-accent hover:text-accent-foreground"
      >
        <IoIosRemoveCircleOutline />
      </div>

      {isDeleteModalOpen && (
        <DeleteCloudModal
          isOpen={isDeleteModalOpen}
          onRequestClose={closeDeleteModal}
          cloudId={cloud.id}
        />
      )}
    </li>
  );
};

export default CloudListItem;
