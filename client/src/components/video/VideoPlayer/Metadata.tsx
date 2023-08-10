interface Props {
  title: string;
}

const Metadata = ({ title }: Props) => {
  return (
    <div className="pt-4">
      <h1 className="text-3xl font-semibold">{title}</h1>
    </div>
  );
};

export default Metadata;
