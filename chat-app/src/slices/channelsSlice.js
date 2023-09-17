import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState();

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
  },
});

export const { actions } = channelSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);

export const getCurrentId = (state) => state.currentChannelId.id;

export const getCurrentChannel = createSelector(
  selectors.selectAll,
  getCurrentId,
  (channels, currentId) => channels.find((channel) => channel.id === currentId),
);

export default channelSlice.reducer;
