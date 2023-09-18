import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

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
export const selectors = channelsAdapter.getSelectors((state) => state.channels);

export const getCurrentId = (state) => state.channels.currentChannelId;

export const selectChannelsState = (state) => state.channels;

export const selectCurrentChannelId = createSelector(
  selectChannelsState,
  (channelsState) => channelsState.currentChannelId,
);

export const getCurrentChannel = createSelector(
  selectors.selectAll,
  getCurrentId,
  (channels, currentId) => channels.find((channel) => channel.id === currentId),
);

export default channelSlice.reducer;
