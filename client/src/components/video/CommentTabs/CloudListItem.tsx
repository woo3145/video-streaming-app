import { decimalToTimeString } from 'utils/dateUtils';
import { cn } from 'utils/twUtils';
import { IoIosRemoveCircleOutline } from 'react-icons/io';
import { BsFillSkipEndFill } from 'react-icons/bs';

interface Props {
  cloud: ICloudComment;
  onClick: () => void;
}

const CloudListItem = ({ cloud, onClick }: Props) => {
  return (
    <li
      className={cn(
        'flex items-stretch',
        cloud.isCreatedLocal && 'text-primary font-bold'
      )}
    >
      <div
        className={cn(
          'group flex items-center w-full px-2 py-2 gap-2 text-sm md:text-base 2xl:text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer',
          cloud.isCreatedLocal && 'hover:text-primary'
        )}
        onClick={onClick}
      >
        <p className="w-full pr-4 break-all">
          {cloud.content}
          {cloud.content}
          {cloud.content}
          {cloud.content}
          {cloud.content}
          {cloud.content}
          {cloud.content}
          {cloud.content}
          {cloud.content}
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
        onClick={() => console.log('댓글 삭제', cloud.id)}
        className="flex items-center justify-center shrink-0 px-2 text-destructive cursor-pointer hover:bg-accent hover:text-accent-foreground"
      >
        <IoIosRemoveCircleOutline />
      </div>
    </li>
  );
};

export default CloudListItem;
