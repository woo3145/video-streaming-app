import { useEffect } from 'react';
import { setPageSize } from 'store/modules/pageSizeSlice';
import { useAppDispatch } from 'store/store';

const PageSizeListener = () => {
  const dispatch = useAppDispatch();

  // 페이지 리사이징시 리덕스에 저장
  useEffect(() => {
    const handleResize = () => {
      dispatch(
        setPageSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      );
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);

  return null;
};

export default PageSizeListener;
