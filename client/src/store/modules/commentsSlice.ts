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
    setComments: (state, action: PayloadAction<IComment[]>) => {
      const comments = action.payload;
      state.comments = comments;
    },
    addComment: (state, action: PayloadAction<IComment>) => {
      const comment = action.payload;
      state.comments = [...state.comments, comment];
    },
  },
});

export const { setComments, addComment } = commentsSlice.actions;

export default commentsSlice.reducer;
