import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface PageSizeState {
  width: number;
  height: number;
}

const initialState: PageSizeState = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const pageSizeSlice = createSlice({
  name: 'pageSize',
  initialState,
  reducers: {
    setPageSize: (
      state,
      action: PayloadAction<{ width: number; height: number }>
    ) => {
      const { width, height } = action.payload;
      state.width = width;
      state.height = height;
    },
  },
});

export const { setPageSize } = pageSizeSlice.actions;

export default pageSizeSlice.reducer;
