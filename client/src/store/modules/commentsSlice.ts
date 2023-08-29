import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface CommentsState {
  comments: Record<
    number,
    {
      data: IComment[];
      lastFetched: number;
    }
  >;
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
      state.comments[videoId] = {
        data: comments,
        lastFetched: Date.now(),
      };
    },
    addComment: (
      state,
      action: PayloadAction<{ videoId: number; comment: IComment }>
    ) => {
      const { videoId, comment } = action.payload;
      if (!state.comments[videoId]) return;
      state.comments[videoId] = {
        ...state.comments[videoId],
        data: [...state.comments[videoId].data, comment],
      };
    },
    removeComment: (
      state,
      action: PayloadAction<{ videoId: number; commentId: string }>
    ) => {
      const { videoId, commentId } = action.payload;
      if (!state.comments[videoId]) return;
      state.comments[videoId].data = state.comments[videoId].data.filter(
        (comment) => comment.id !== commentId
      );
    },
  },
});

export const { setComments, addComment, removeComment } = commentsSlice.actions;

export default commentsSlice.reducer;
