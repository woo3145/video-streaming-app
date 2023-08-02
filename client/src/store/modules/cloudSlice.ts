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
    setClouds: (state, action: PayloadAction<{ clouds: ICloudComment[] }>) => {
      const { clouds } = action.payload;
      state.clouds = clouds;
    },
  },
});

export const { setClouds } = cloudsSlice.actions;

export default cloudsSlice.reducer;
