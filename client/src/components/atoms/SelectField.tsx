import {
  MouseEvent,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { cn } from 'src/utils/twUtils';
import { BiChevronDown } from 'react-icons/bi';

interface SelectContextProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  value: string | null;
  selectedItemLabel: string | null;
  onChange: (value: string, label: string) => void;
  selectRef: React.RefObject<HTMLDivElement>;
}

const SelectContext = createContext<SelectContextProps | null>(null);

interface SelectProps {
  children: ReactNode;
  value: string | null;
  onChange: (value: string) => void;
}

//** Select의 상태를 주입받고 드롭다운 UI의 상태를 관리함 */
const Select = ({ children, value, onChange, ...props }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItemLabel, setSelectedItemLabel] = useState<string | null>(
    null
  );
  const selectRef = useRef<HTMLDivElement>(null); // Ref가 아닌 요소 클릭 시 드롭다운 닫기위함
  const contextValue: SelectContextProps = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      value,
      selectedItemLabel,
      onChange: (value: string, label: string) => {
        onChange(value);
        setSelectedItemLabel(label);
      },
      selectRef,
    }),
    [isOpen, setIsOpen, value, onChange, selectRef, selectedItemLabel]
  );

  // Ref가 아닌 요소 클릭 시 드롭다운 닫기위한 이벤트 등록
  // 예정

  return (
    <SelectContext.Provider value={contextValue}>
      <div ref={selectRef} className="relative" {...props}>
        {children}
      </div>
    </SelectContext.Provider>
  );
};

interface FieldLabelProps {
  children: ReactNode;
  className?: string;
}
//** 필드위에 표시 할 label을 렌더링함 */
const FieldLabel = ({ children, className }: FieldLabelProps) => {
  return (
    <p className={cn('text-sm text-foreground/50', className)}>{children}</p>
  );
};

interface SelectTriggerProps {
  children: ReactNode;
  className?: string;
}
//** 드롭다운을 토글하는 트리거를 렌더링함 */
const SelectTrigger = ({ children, className }: SelectTriggerProps) => {
  const selectContext = useContext(SelectContext);
  if (!selectContext) {
    throw new Error('Select 컴포넌트 내부에 위치하고 있지 않습니다.');
  }
  const { isOpen, setIsOpen, value } = selectContext;

  const handleClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        'flex items-center justify-between px-4 py-2 border border-input rounded-md text-base hover:border-primary focus:border-primary focus:ring-1 ring-ring',
        value && 'border-primary',
        className
      )}
    >
      {children}
      <BiChevronDown />
    </button>
  );
};

interface SelectValueProps {
  placeholder?: string;
}
//** 드롭다운에서 현재 선택된 값의 라벨을 표시함 */
const SelectValue = ({ placeholder }: SelectValueProps) => {
  const selectContext = useContext(SelectContext);
  if (!selectContext) {
    throw new Error('Select 컴포넌트 내부에 위치하고 있지 않습니다.');
  }
  const { selectedItemLabel } = selectContext;

  return (
    <span
      className={cn(selectedItemLabel ? '' : 'text-secondary-foreground/50')}
    >
      {selectedItemLabel || placeholder}
    </span>
  );
};

interface SelectContentProps {
  children?: ReactNode;
}
//** 드롭다운이 열려 있을 때 항목들을 렌더링함  */
const SelectContent = ({ children }: SelectContentProps) => {
  const selectContext = useContext(SelectContext);

  if (!selectContext) {
    throw new Error('Select 컴포넌트 내부에 위치하고 있지 않습니다.');
  }

  const { isOpen, selectRef } = selectContext;

  return isOpen ? (
    <div
      className="absolute z-10 left-0 mt-2 w-full rounded-md border shadow-lg bg-popover text-popover-foreground"
      ref={selectRef}
    >
      {children}
    </div>
  ) : null;
};

interface SelectItemProps {
  children?: ReactNode;
  value: string;
}
//** 드롭다운의 개별 항목들을 렌더링하고 주입받은 Select 상태를 변경함 */
const SelectItem = ({ children, value }: SelectItemProps) => {
  const selectContext = useContext(SelectContext);
  if (!selectContext) {
    throw new Error('Select 컴포넌트 내부에 위치하고 있지 않습니다.');
  }
  const { onChange, setIsOpen } = selectContext;

  // 항목 클릭 시 onChange를 호출하고 선택한 값을 전달 후 드롭다운을 닫음
  const handleClick = useCallback(
    (e: MouseEvent) => {
      // 라벨이 없을 시 value 값으로 대체
      const label = (e.target as HTMLElement).textContent || value;
      onChange(value, label);
      setIsOpen(false);
    },
    [onChange, setIsOpen, value]
  );

  return (
    <div
      className="py-2 px-4 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer"
      onClick={handleClick}
    >
      {children ? children : value}
    </div>
  );
};

export {
  Select,
  FieldLabel,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
};
