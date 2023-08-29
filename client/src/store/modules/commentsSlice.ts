import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface CommentsState {
  comments: Record<number, IComment[]>;
}

const initialState: CommentsState = {
  comments: {},
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (
      state,
      action: PayloadAction<{ videoId: number; comments: IComment[] }>
    ) => {
      const { videoId, comments } = action.payload;
      state.comments[videoId] = comments;
    },
    addComment: (
      state,
      action: PayloadAction<{ videoId: number; comment: IComment }>
    ) => {
      const { videoId, comment } = action.payload;
      state.comments[videoId] = [...state.comments[videoId], comment];
    },
    removeComment: (
      state,
      action: PayloadAction<{ videoId: number; commentId: string }>
    ) => {
      const { videoId, commentId } = action.payload;
      state.comments[videoId] = state.comments[videoId].filter(
        (comment) => comment.id !== commentId
      );
    },
  },
});

export const { setComments, addComment, removeComment } = commentsSlice.actions;

export default commentsSlice.reducer;
