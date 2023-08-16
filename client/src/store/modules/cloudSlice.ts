import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface CloudsState {
  clouds: ICloudComment[];
  isVisible: boolean;
}

const initialState: CloudsState = {
  clouds: [],
  isVisible: true,
};

const cloudsSlice = createSlice({
  name: 'clouds',
  initialState,
  reducers: {
    setClouds: (state, action: PayloadAction<ICloudComment[]>) => {
      const clouds = action.payload;
      state.clouds = clouds;
    },
    addCloud: (state, action: PayloadAction<ICloudComment>) => {
      const cloud = action.payload;
      state.clouds = [...state.clouds, cloud];
    },
    setCloudsIsVisible: (state, action: PayloadAction<boolean>) => {
      state.isVisible = action.payload;
    },
  },
});

export const { setClouds, addCloud, setCloudsIsVisible } = cloudsSlice.actions;

export default cloudsSlice.reducer;
