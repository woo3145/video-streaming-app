import React, { ChangeEvent, useEffect, useState } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from 'utils/twUtils';

const labelVariants = cva(
  [
    // Layout & Position & Size
    'absolute left-4',
    // Background
    'bg-background',
    // Text
    'peer-placeholder-shown:text-foreground/70',
    // Interaction
    'pointer-events-none',
    // Transition
    'duration-200 transition-transform',
  ],
  {
    variants: {
      isValid: {
        false: 'text-destructive',
        true: 'text-primary dark:text-foreground',
      },
      isEmpty: {
        false: 'top-2 w-auto bg-inherit text-xs -translate-y-5',
        true: 'w-11/12 text-base translate-y-0 peer-focus:w-auto peer-focus:top-2 peer-focus:bg-inherit peer-focus:text-primary peer-focus:dark:text-foreground peer-focus:text-xs peer-focus:-translate-y-5',
      },
    },
    defaultVariants: {
      isValid: false,
      isEmpty: true,
    },
  }
);

const inputVariants = cva(
  [
    // Layout & Position & Size
    'py-2 px-4 w-full',
    // Border & Shape
    'border focus:outline-none focus:ring-1 ring-ring rounded-md',
    // Background
    'bg-background',
    // Interaction
    'peer',
  ],
  {
    variants: {
      isValid: {
        false: 'border-destructive ring-destructive',
        true: 'border-primary dark:border-primary/80',
      },
      isEmpty: {
        false: '',
        true: 'border-input focus:border focus:border-primary focus:ring-1 focus:ring-ring text-secondary-foreground',
      },
    },
    defaultVariants: {
      isValid: false,
      isEmpty: true,
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const TextInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, onChange, value, ...props }, ref) => {
    // label
    const [isValid, setIsValid] = useState(false);
    const [isEmpty, setIsEmpty] = useState(true);
    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
      const { validity } = e.target;
      setIsValid(validity.valid);
      if (onChange) onChange(e);
    };
    useEffect(() => {
      if (value === '') {
        setIsValid(false);
      }
      setIsEmpty(value === '');
    }, [value]);

    return (
      <div className="relative flex items-center w-full">
        <input
          type={type}
          onChange={handleInput}
          className={cn(inputVariants({ isValid, isEmpty, className }))}
          ref={ref}
          value={value}
          {...props}
        />
        {label && (
          <label className={cn(labelVariants({ isValid, isEmpty }))}>
            {label}
          </label>
        )}
      </div>
    );
  }
);
TextInput.displayName = 'TextInput';

export { TextInput };
