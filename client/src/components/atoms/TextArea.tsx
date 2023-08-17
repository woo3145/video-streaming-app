import React, { useEffect, useState, ChangeEvent } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from 'utils/twUtils';

const labelVariants = cva(
  [
    // Layout & Position & Size
    'absolute top-2 left-4',
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
        false: 'w-auto bg-inherit text-xs -translate-y-5',
        true: 'w-4/5 text-base translate-y-0 peer-focus:w-auto peer-focus:bg-inherit peer-focus:text-primary peer-focus:dark:text-foreground peer-focus:text-xs peer-focus:-translate-y-5',
      },
    },
    defaultVariants: {
      isValid: false,
      isEmpty: true,
    },
  }
);

const textareaVariants = cva(
  [
    // Layout & Position & Size
    'flex min-h-[80px] w-full px-4 py-2',
    // Border & Shape
    'border focus:outline-none focus:ring-1 ring-ring rounded-md',
    // Background
    'bg-background',
    // Text
    'text-base font-sans',
    // Interaction
    'peer resize-none',
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
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, InputProps>(
  ({ className, label, onChange, value, ...props }, ref) => {
    // label
    const [isValid, setIsValid] = useState(false);
    const [isEmpty, setIsEmpty] = useState(true);
    const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
      const { validity } = e.target;

      setIsValid(validity.valid);
      if (onChange) onChange(e);
    };

    useEffect(() => {
      if (value === '') {
        setIsEmpty(true);
        setIsValid(false);
      }
    }, [value]);

    return (
      <div className="relative flex items-center w-full">
        <textarea
          onChange={handleInput}
          className={cn(textareaVariants({ isValid, isEmpty, className }))}
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
TextArea.displayName = 'TextArea';

export { TextArea };
