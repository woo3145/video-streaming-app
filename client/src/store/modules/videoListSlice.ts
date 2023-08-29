import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface VideoListState {
  videos: IVideoWithThumbnail[];
  lastFetched: number | null;
  isLoading: boolean;
}

const initialState: VideoListState = {
  videos: [],
  lastFetched: null,
  isLoading: false,
};

const videosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    setVideoList(state, action: PayloadAction<IVideoWithThumbnail[]>) {
      state.videos = action.payload;
      state.lastFetched = Date.now();
      state.isLoading = false;
    },
    startFetchVideoList(state) {
      state.isLoading = true;
    },
  },
});

export const { setVideoList, startFetchVideoList } = videosSlice.actions;

export default videosSlice.reducer;
