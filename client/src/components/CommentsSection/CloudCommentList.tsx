interface Props {
  clouds: ICloudComment[];
  setCurrentVideoTime: (newTime: number) => void;
}

const CloudCommentList = ({ clouds, setCurrentVideoTime }: Props) => {
  return (
    <ul className="text-lg">
      {clouds.map((cloud, idx) => {
        return (
          <li
            key={idx}
            className="py-2 px-4 hover:bg-gray-200 cursor-pointer duration-200 truncate hover:whitespace-normal"
            onClick={() => setCurrentVideoTime(cloud.displayTime)}
          >
            {cloud.content}
          </li>
        );
      })}
    </ul>
  );
};

export default CloudCommentList;
