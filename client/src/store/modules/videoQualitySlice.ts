import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface PageSizeState {
  quality: TVideoQuality;
}

const initialState: PageSizeState = {
  quality: 'medium',
};

const videoQualitySlice = createSlice({
  name: 'videoQualitySlice',
  initialState,
  reducers: {
    setVideoQuality: (state, action: PayloadAction<TVideoQuality>) => {
      state.quality = action.payload;
    },
  },
});

export const { setVideoQuality } = videoQualitySlice.actions;

export default videoQualitySlice.reducer;
