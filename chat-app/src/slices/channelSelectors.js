import { createSelector } from '@reduxjs/toolkit';
import { channelsAdapter } from './channelsSlice';

export const selectors = channelsAdapter.getSelectors((state) => state.channels);

export const selectCurrentId = (state) => state.channels.currentChannelId;

export const selectChannelsState = (state) => state.channels;

export const selectCurrentChannelId = createSelector(
  selectChannelsState,
  (channelsState) => channelsState.currentChannelId,
);

export const selectCurrentChannel = createSelector(
  selectors.selectAll,
  selectCurrentId,
  (channels, currentId) => channels.find((channel) => channel.id === currentId),
);
