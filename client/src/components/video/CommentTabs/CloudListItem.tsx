import { decimalToTimeString } from 'utils/dateUtils';
import { cn } from 'utils/twUtils';

interface Props {
  cloud: ICloudComment;
  onClick: () => void;
}

const CloudListItem = ({ cloud, onClick }: Props) => {
  return (
    <li
      className={cn(
        'flex justify-between items-center py-2 px-4 hover:bg-accent hover:border-l-4 border-primary cursor-pointer truncate hover:whitespace-normal',
        cloud.isCreatedLocal && 'text-primary font-bold'
      )}
      onClick={onClick}
    >
      <p>{cloud.content}</p>
      <p>{decimalToTimeString(cloud.displayTime)}</p>
    </li>
  );
};

export default CloudListItem;
