import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface CloudsState {
  clouds: Record<
    number,
    {
      data: ICloudComment[];
      lastFetched: number;
    }
  >;
  isVisible: boolean;
}

const initialState: CloudsState = {
  clouds: {},
  isVisible: true,
};

const cloudsSlice = createSlice({
  name: 'clouds',
  initialState,
  reducers: {
    setClouds: (
      state,
      action: PayloadAction<{ videoId: number; clouds: ICloudComment[] }>
    ) => {
      const { videoId, clouds } = action.payload;
      state.clouds[videoId] = {
        lastFetched: Date.now(),
        data: clouds,
      };
    },
    addCloud: (
      state,
      action: PayloadAction<{ videoId: number; cloud: ICloudComment }>
    ) => {
      const { videoId, cloud } = action.payload;
      if (!state.clouds[videoId]) return;
      state.clouds[videoId] = {
        ...state.clouds[videoId],
        data: [...state.clouds[videoId].data, cloud],
      };
    },
    removeCloud: (
      state,
      action: PayloadAction<{ videoId: number; cloudId: string }>
    ) => {
      const { videoId, cloudId } = action.payload;
      if (!state.clouds[videoId]) return;
      state.clouds[videoId].data = state.clouds[videoId].data.filter(
        (cloud) => cloud.id !== cloudId
      );
    },
    setCloudsIsVisible: (state, action: PayloadAction<boolean>) => {
      state.isVisible = action.payload;
    },
  },
});

export const { setClouds, addCloud, setCloudsIsVisible, removeCloud } =
  cloudsSlice.actions;

export default cloudsSlice.reducer;
