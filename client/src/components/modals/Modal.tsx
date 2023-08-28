import { useOnClickOutside } from 'hooks/utilsHooks/useOnClickOutside';
import React, { useCallback, useEffect, useRef } from 'react';
import { cn } from 'utils/twUtils';

interface Props {
  children: React.ReactNode;
  shouldCloseOnOverlayClick?: boolean;
  onRequestClose: () => void;
}

export const Modal = ({
  children,
  shouldCloseOnOverlayClick = true,
  onRequestClose,
}: Props) => {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);

  const closeModal = useCallback(() => {
    onRequestClose();
  }, [onRequestClose]);

  // 모달창 존재 시 body 스크롤 막기
  useEffect(() => {
    document.body.style.cssText = `
        position: fixed;
        top: -${window.scrollY}px;
        left:0;
        overflow-y: scroll;
        width: 100%;
    `;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  useOnClickOutside([wrapper], closeModal);

  return (
    <div
      ref={overlay}
      className="fixed top-0 bottom-0 left-0 right-0 z-[100] mx-auto bg-background/60"
    >
      <div
        ref={wrapper}
        className={cn(
          'flex items-center justify-center w-full h-full px-6 py-14 bg-background rounded-md shadow-md mx-auto',
          [
            'xl:py-12 xl:w-auto xl:h-auto xl:rounded-md xl:-translate-y-1/2 xl:-translate-x-1/2 xl:absolute xl:left-1/2 xl:top-1/2',
          ]
        )}
      >
        {children}
      </div>
    </div>
  );
};
