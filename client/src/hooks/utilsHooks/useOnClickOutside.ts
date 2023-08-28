import { useCallback, useEffect } from 'react';

//** ref의 외부를 클릭할 때 주어진 콜백 함수 호출 */
export const useOnClickOutside = (
  refs: React.RefObject<HTMLElement>[],
  callback: () => void
) => {
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      // ref의 내부 클릭시
      if (
        refs.every(
          (ref) => ref.current && !ref.current.contains(e.target as Node)
        )
      ) {
        callback();
      }
    },
    [callback, refs]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [refs, callback, handleClickOutside]);
};
