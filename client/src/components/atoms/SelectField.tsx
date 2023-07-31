import React, { ChangeEvent } from 'react';

type SelectProps = {
  name: string;
  placeholder: string;
  options: { value: string; label: string }[];
  onChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  defaultValue?: string;
};

const SelectField = ({
  name,
  placeholder,
  options,
  onChange,
  defaultValue,
}: SelectProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm text-gray-400">
        {placeholder}
      </label>
      <select
        name={name}
        id={name}
        onChange={onChange}
        defaultValue={defaultValue}
        className="w-full py-2 px-2 text-lg border rounded-lg border-purple-600 outline-purple-600"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
