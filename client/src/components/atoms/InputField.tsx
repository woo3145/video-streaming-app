import { ChangeEvent, HTMLInputTypeAttribute, useMemo, useState } from 'react';

interface Props {
  name: string;
  label: string;
  required?: boolean;
  type?: HTMLInputTypeAttribute | 'textarea';
  minLength: number;
  maxLength: number;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const InputField = ({
  name,
  minLength,
  maxLength,
  label,
  required,
  type = 'text',
  onChange,
}: Props) => {
  const [isValid, setIsValid] = useState(false);
  const [isInValid, setIsInValid] = useState(false);
  const handleInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, validity } = e.target;
    if (value === '') {
      setIsValid(false);
      setIsInValid(false);
    } else {
      setIsValid(validity.valid);
      setIsInValid(!validity.valid);
    }
    onChange(e);
  };
  const isEmpty = useMemo(() => !isValid && !isInValid, [isValid, isInValid]);

  const baseLabelStyles =
    'absolute top-2 left-4 bg-white duration-200 pointer-events-none peer-placeholder-shown:text-gray-500';
  const floatingLabelStyles = 'text-xs -translate-y-4 w-auto';
  const placeHolderLabelStyles = 'text-base translate-y-0 w-4/5';
  const validLabelStyles = 'text-purple-600';
  const inValidLabelStyles = 'text-red-600';
  const emptyAndFocusLabelStyles =
    'peer-focus:text-xs peer-focus:-translate-y-4 peer-focus:w-auto peer-focus:text-purple-600';

  return (
    <div className="relative flex items-center w-full">
      {type === 'textarea' ? (
        <textarea
          name={name}
          onChange={handleInput}
          className={`peer py-2 px-4 border rounded-lg outline-purple-600 w-full resize-none
      ${isInValid ? 'outline-red-600 border-red-600' : ''} 
      ${isValid ? 'border-purple-600' : ''}
    `}
          placeholder={`${minLength} - ${maxLength}글자`}
          required
          rows={3}
          minLength={minLength}
          maxLength={maxLength}
        />
      ) : (
        <input
          name={name}
          onChange={handleInput}
          type={type}
          className={`peer py-2 px-4 border rounded-lg outline-purple-600 w-full
      ${isInValid ? 'outline-red-600 border-red-600' : ''} 
      ${isValid ? 'border-purple-600' : ''}
      `}
          placeholder={`${minLength} - ${maxLength}글자`}
          required
          minLength={minLength}
          maxLength={maxLength}
        />
      )}

      <label
        className={`${baseLabelStyles} ${
          isEmpty ? placeHolderLabelStyles : floatingLabelStyles
        }
        ${isEmpty ? emptyAndFocusLabelStyles : ''}
        ${isValid ? validLabelStyles : ''}
        ${isInValid ? inValidLabelStyles : ''}`}
      >
        {label}
        {required && <span> *</span>}
      </label>
    </div>
  );
};

export default InputField;
