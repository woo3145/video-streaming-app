import { configureStore } from '@reduxjs/toolkit';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import pageSizeSlice from './modules/pageSizeSlice';
import videoSlice from './modules/videoSlice';
import commentsSlice from './modules/commentsSlice';
import cloudSlice from './modules/cloudSlice';
import videoQualitySlice from './modules/videoQualitySlice';

export const store = configureStore({
  reducer: {
    video: videoSlice,
    pageSize: pageSizeSlice,
    comments: commentsSlice,
    clouds: cloudSlice,
    videoQuality: videoQualitySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 타입지정된 useDispatch & useSelector
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
