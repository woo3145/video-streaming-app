interface Props {
  title: string;
}

const Metadata = ({ title }: Props) => {
  return (
    <div className="pt-4 px-4 2xl:px-0">
      <h1 className="text-3xl font-semibold text-foreground">{title}</h1>
    </div>
  );
};

export default Metadata;
