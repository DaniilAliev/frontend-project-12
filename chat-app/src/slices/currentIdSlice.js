import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const initialChannelId = 1;

const initialState = { id: initialChannelId };

const currentChannelIdSlice = createSlice({
  name: 'currentChannelId',
  initialState,
  reducers: {
    setCurrentId: (state, { payload }) => (
      { ...state, id: payload }
    ),
    setDefaultId: (state) => (
      { ...state, id: initialChannelId }
    ),
  },
});

export const { actions } = currentChannelIdSlice;
export const selectors = channelsAdapter.getSelectors((state) => state);
export default currentChannelIdSlice.reducer;
