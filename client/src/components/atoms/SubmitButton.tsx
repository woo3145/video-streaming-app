interface Props {
  isValid: boolean;
  text: string;
}

const SubmitButton = ({ isValid, text }: Props) => {
  return (
    <button
      type="submit"
      disabled={!isValid}
      className={`flex items-center justify-center w-full py-2 rounded-lg ${
        isValid ? 'bg-purple-600 text-white' : 'bg-gray-400 text-white'
      }`}
    >
      {text}
    </button>
  );
};

export default SubmitButton;
