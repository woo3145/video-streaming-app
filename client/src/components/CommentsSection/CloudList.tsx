interface Props {
  clouds: ICloudComment[];
}

const CloudList = ({ clouds }: Props) => {
  return (
    <ul className="text-lg">
      {clouds.map((cloud, idx) => {
        return (
          <li
            key={idx}
            className="py-2 px-4 hover:bg-gray-200 cursor-pointer duration-200 truncate hover:whitespace-normal"
          >
            {cloud.content}
          </li>
        );
      })}
    </ul>
  );
};

export default CloudList;
