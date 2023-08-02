import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface CommentsState {
  comments: IComment[];
}

const initialState: CommentsState = {
  comments: [],
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<{ comments: IComment[] }>) => {
      const { comments } = action.payload;
      state.comments = comments;
    },
  },
});

export const { setComments } = commentsSlice.actions;

export default commentsSlice.reducer;
