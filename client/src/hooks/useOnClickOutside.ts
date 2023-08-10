import { useCallback, useEffect } from 'react';

//** ref의 outside를 클릭하면 callback을 실행하는 이벤트핸들러 등록 */
export const useOnClickOutside = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void
) => {
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      // ref의 내부 클릭시
      if (ref.current && ref.current.contains(e.target as Node)) {
        return;
      }
      callback();
    },
    [callback, ref]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback, handleClickOutside]);
};
