import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface VideoState {
  video: IVideoWithThumbnail | null;
  duration: number;
  currentTime: number;
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  bufferedRanges: { start: number; end: number }[];

  videoWidth: number;
  videoHeight: number;
  isFullScreen: boolean;
}

const initialState: VideoState = {
  video: null,
  duration: 0,
  currentTime: 0,
  isPlaying: false,
  isMuted: false,
  volume: 0.5,
  bufferedRanges: [],

  videoWidth: 0,
  videoHeight: 0,
  isFullScreen: false,
};

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setVideo: (state, action: PayloadAction<IVideoWithThumbnail>) => {
      state.video = action.payload;
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
    setBufferedRanges: (
      state,
      action: PayloadAction<{ start: number; end: number }[]>
    ) => {
      state.bufferedRanges = action.payload;
    },

    setVideoSize: (
      state,
      action: PayloadAction<{ width: number; height: number }>
    ) => {
      state.videoWidth = action.payload.width;
      state.videoHeight = action.payload.height;
    },

    setIsFullScreen: (state, action: PayloadAction<boolean>) => {
      state.isFullScreen = action.payload;
    },
  },
});

export const {
  setVideo,
  setDuration,
  setCurrentTime,
  setIsPlaying,
  setVolume,
  setIsMuted,
  setBufferedRanges,
  setVideoSize,
  setIsFullScreen,
} = videoSlice.actions;

export default videoSlice.reducer;
