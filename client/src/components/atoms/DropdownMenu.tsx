import React, {
  ReactElement,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { cn } from 'utils/twUtils';
import { useOnClickOutside } from 'hooks/useOnClickOutside';

interface DropdownMenuContextProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  dropdownMenuRef: React.RefObject<HTMLDivElement>;
}

const DropdownMenuContext = createContext<DropdownMenuContextProps | null>(
  null
);

interface DropdownMenuProps {
  children: ReactNode;
  className?: string;
}

//** 드롭다운 UI 상태를 관리  */
const DropdownMenu = ({ children, className }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  const contextValue: DropdownMenuContextProps = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      dropdownMenuRef,
    }),
    [isOpen, setIsOpen, dropdownMenuRef]
  );

  useOnClickOutside(dropdownMenuRef, () => {
    setIsOpen(false);
  });
  return (
    <DropdownMenuContext.Provider value={contextValue}>
      <div className={cn('relative inline-block', className)}>{children}</div>
    </DropdownMenuContext.Provider>
  );
};

interface DropdownMenuTriggerProps {
  children: ReactNode;
}
//** children에 드롭다운을 토글하는 기능을 추가하는 HOC */
const DropdownMenuTrigger = ({ children }: DropdownMenuTriggerProps) => {
  const dropdownMenuContext = useContext(DropdownMenuContext);
  if (!dropdownMenuContext) {
    throw new Error('DropdownMenu 컴포넌트 내부에 위치하고 있지 않습니다.');
  }
  const { isOpen, setIsOpen } = dropdownMenuContext;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <React.Fragment>
      {React.Children.map(children, (child) => {
        // 자식이 Element가 아니라면 그냥반환 ({}, null, undefined)
        if (!React.isValidElement(child)) return child;
        // Element라면 드롭다운을 여는 기능을 추가
        return React.cloneElement(child as ReactElement, {
          onClick: (e: React.MouseEvent<HTMLElement>) => {
            handleClick(e);
            // Element에 기존 onClick이 존재한다면 실행
            if (typeof child.props.onClick === 'function') {
              child.props.onClick(e);
            }
          },
        });
      })}
    </React.Fragment>
  );
};

interface DropdownMenuContentProps {
  className?: string;
  children: ReactNode;
}
//** 드롭다운이 열려 있을 때 항목들을 렌더링함  */
const DropdownMenuContent = ({
  className,
  children,
}: DropdownMenuContentProps) => {
  const dropdownMenuContext = useContext(DropdownMenuContext);
  if (!dropdownMenuContext) {
    throw new Error('DropdownMenu 컴포넌트 내부에 위치하고 있지 않습니다.');
  }
  const { isOpen, dropdownMenuRef } = dropdownMenuContext;

  return isOpen ? (
    <div
      className={cn(
        'absolute z-10 bottom-12 right-0 p-2 w-full rounded-md border bg-black/80 border-white/20 shadow-lg',
        className
      )}
      ref={dropdownMenuRef}
    >
      {children}
    </div>
  ) : null;
};

interface DropdownMenuRadioContextProps {
  value: string;
  setValue: (value: string) => void;
}
const DropdownMenuRadioContext =
  createContext<DropdownMenuRadioContextProps | null>(null);

interface DropdwonMenuRadioProps {
  value: string;
  setValue: (value: string) => void;
  className?: string;
  children: ReactNode;
}
//** 관리할 Radio 상태를 주입받고 관리함 */
const DropdownMenuRadio = ({
  value,
  setValue,
  className,
  children,
}: DropdwonMenuRadioProps) => {
  const contextValue: DropdownMenuRadioContextProps = useMemo(
    () => ({
      value,
      setValue,
    }),
    [value, setValue]
  );
  return (
    <DropdownMenuRadioContext.Provider value={contextValue}>
      <div className={cn('', className)}>{children}</div>
    </DropdownMenuRadioContext.Provider>
  );
};

interface DropdownMenuRadioItemProps {
  value: string;
  className?: string;
  children: ReactNode;
}

//** 드롭다운의 개별 항목들을 렌더링하고 주입받은 Radio 상태로 변경함 */
const DropdownMenuRadioItem = ({
  value,
  className,
  children,
}: DropdownMenuRadioItemProps) => {
  const dropdownMenuRadioContext = useContext(DropdownMenuRadioContext);
  const dropdownMenuContext = useContext(DropdownMenuContext);
  if (!dropdownMenuRadioContext || !dropdownMenuContext) {
    throw new Error(
      'dropdownMenu 또는 DropdownMenuRadio 컴포넌트 내부에 위치하고 있지 않습니다.'
    );
  }
  const { value: _value, setValue } = dropdownMenuRadioContext;
  const { setIsOpen } = dropdownMenuContext;

  // 항목 클릭 시 onChange를 호출하고 선택한 값을 전달 후 드롭다운을 닫음
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      setValue(value);
      setIsOpen(false);
    },
    [setValue, setIsOpen, value]
  );

  const isActive = _value === value;
  return (
    <div
      onClick={handleClick}
      className={cn(
        'py-2 px-4 rounded-md text-sm hover:bg-white/20 hover:text-white cursor-pointer',
        isActive && 'bg-white/40 hover:bg-white/40 font-bold',
        className
      )}
    >
      {children}
    </div>
  );
};

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadio,
  DropdownMenuRadioItem,
};
