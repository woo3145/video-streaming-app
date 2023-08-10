import React, { createContext, useContext, useState } from 'react';
import { cn } from 'src/utils/twUtils';

interface TabsContextProps {
  activeTabValue: string;
  setActiveTabValue: (value: string) => void;
}

const TabsContext = createContext<TabsContextProps | null>(null);

interface TabsProps {
  children: React.ReactNode;
  defaultValue: string;
  className?: string;
}

const Tabs = ({ children, defaultValue, className }: TabsProps) => {
  const [activeTabValue, setActiveTabValue] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTabValue, setActiveTabValue }}>
      <div className={cn(className)}>{children}</div>
    </TabsContext.Provider>
  );
};

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}
const TabsList = ({ children, className }: TabsListProps) => (
  <div className={cn(className)}>{children}</div>
);

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}
const TabsTrigger = ({ value, children, className }: TabsTriggerProps) => {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error('Tabs 컴포넌트 내부에 위치하고 있지 않습니다.');
  }
  const { activeTabValue, setActiveTabValue } = context;
  const isActive = activeTabValue === value;
  return (
    <button
      className={cn(
        'flex justify-center items-center w-full py-2 cursor-pointer hover:bg-accent hover:text-accent-foreground',
        isActive ? 'border-b-4 border-primary' : 'text-foreground',
        className
      )}
      onClick={() => setActiveTabValue(value)}
    >
      {children}
    </button>
  );
};

interface TabsContentProps {
  children: React.ReactNode;
  value: string;
  className?: string;
}

const TabsContent = ({ children, value, className }: TabsContentProps) => {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error('Tabs 컴포넌트 내부에 위치하고 있지 않습니다.');
  }
  const { activeTabValue } = context;
  const isActive = activeTabValue === value;

  return (
    <>
      {isActive ? (
        <div className={cn(isActive ? 'block' : 'hidden', className)}>
          {children}
        </div>
      ) : null}
    </>
  );
};

export { Tabs, TabsList, TabsTrigger, TabsContent };
