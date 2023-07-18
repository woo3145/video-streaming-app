import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface VideoState {
  src: string;
  duration: number;
  currentTime: number;
}

const initialState: VideoState = {
  src: '',
  duration: 0,
  currentTime: 0,
};

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setVideoSrc: (state, action: PayloadAction<string>) => {
      state.src = action.payload;
      state.duration = 0;
      state.currentTime = 0;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
  },
});

export const { setVideoSrc, setDuration, setCurrentTime } = videoSlice.actions;

export default videoSlice.reducer;
