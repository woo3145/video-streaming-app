import { cva } from 'class-variance-authority';
import * as React from 'react';
import { cn } from 'src/utils/twUtils';

const labelVariants = cva(
  [
    // Layout & Position & Size
    'absolute top-2 left-4',
    // Background
    'bg-white',
    // Text
    'peer-placeholder-shown:text-secondary-foreground/50',
    // Interaction
    'pointer-events-none',
    // Transition
    'duration-200',
  ],
  {
    variants: {
      isValid: {
        false: 'text-destructive',
        true: 'text-primary',
      },
      isEmpty: {
        false: 'w-auto text-xs -translate-y-4',
        true: 'w-4/5 text-base translate-y-0 peer-focus:w-auto peer-focus:text-primary peer-focus:text-xs peer-focus:-translate-y-4',
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
    'border border-input outline-primary rounded-md',
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
        false: 'outline-destructive border-destructive',
        true: 'border-primary',
      },
      isEmpty: {
        false: '',
        true: 'outline-primary border-input text-secondary-foreground',
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

const TextAreaField = React.forwardRef<HTMLTextAreaElement, InputProps>(
  ({ className, label, onChange, ...props }, ref) => {
    // label
    const [isValid, setIsValid] = React.useState(false);
    const [isEmpty, setIsEmpty] = React.useState(true);
    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const { value, validity } = e.target;
      if (value === '') {
        setIsValid(true);
        setIsEmpty(true);
      } else {
        setIsValid(validity.valid);
        setIsEmpty(false);
      }
      if (onChange) onChange(e);
    };

    return (
      <div className="relative flex items-center w-full">
        <textarea
          onChange={handleInput}
          className={cn(textareaVariants({ isValid, isEmpty, className }))}
          ref={ref}
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
TextAreaField.displayName = 'TextAreaInputField';

export { TextAreaField };
