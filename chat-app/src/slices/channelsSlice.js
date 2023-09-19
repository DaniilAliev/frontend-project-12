import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

export const channelsAdapter = createEntityAdapter();

const initialChannelId = 1;

const initialState = channelsAdapter.getInitialState({ currentChannelId: initialChannelId });

const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: channelsAdapter.addMany,
    addChannel: channelsAdapter.addOne,
    removeChannel: (state, { payload }) => {
      channelsAdapter.removeOne(state, payload);
    },
    updateChannel: channelsAdapter.updateOne,
    setCurrentId: (state, { payload }) => (
      { ...state, currentChannelId: payload }
    ),
    setDefaultId: (state) => (
      { ...state, currentChannelId: initialChannelId }
    ),
  },
});

export const { actions } = channelSlice;

export default channelSlice.reducer;
