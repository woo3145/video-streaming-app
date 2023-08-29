import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface CloudsState {
  clouds: Record<number, ICloudComment[]>;
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
      state.clouds[videoId] = clouds;
    },
    addCloud: (
      state,
      action: PayloadAction<{ videoId: number; cloud: ICloudComment }>
    ) => {
      const { videoId, cloud } = action.payload;
      state.clouds[videoId] = [...state.clouds[videoId], cloud];
    },
    removeCloud: (
      state,
      action: PayloadAction<{ videoId: number; cloudId: string }>
    ) => {
      const { videoId, cloudId } = action.payload;
      state.clouds[videoId] = state.clouds[videoId].filter(
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
