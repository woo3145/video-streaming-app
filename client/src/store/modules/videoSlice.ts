import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface VideoState {
  src: string;
  duration: number;
  currentTime: number;
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
}

const initialState: VideoState = {
  src: '',
  duration: 0,
  currentTime: 0,
  isPlaying: false,
  isMuted: false,
  volume: 0.5,
};

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setVideoSrc: (state, action: PayloadAction<string>) => {
      state.src = action.payload;
      state.duration = 0;
      state.currentTime = 0;
      state.isPlaying = false;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
    setIsMuted: (state, action: PayloadAction<boolean>) => {
      state.isMuted = action.payload;
    },
  },
});

export const {
  setVideoSrc,
  setDuration,
  setCurrentTime,
  setIsPlaying,
  setVolume,
  setIsMuted,
} = videoSlice.actions;

export default videoSlice.reducer;
