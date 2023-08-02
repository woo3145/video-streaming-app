import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface CloudsState {
  clouds: ICloudComment[];
}

const initialState: CloudsState = {
  clouds: [],
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
  },
});

export const { setClouds, addCloud } = cloudsSlice.actions;

export default cloudsSlice.reducer;
