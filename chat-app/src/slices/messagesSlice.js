import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import { actions as channelActions } from './channelsSlice';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessages: messagesAdapter.addMany,
        addMessage: messagesAdapter.addOne,
    },
    extraReducers: (builder) => {
        builder.addCase(channelActions.removeChannel, (state, { payload }) => {
          const channelId = payload;
          const restEntities = Object.values(state.entities).filter(e => e.channelId !== channelId);
            messagesAdapter.setAll(state, restEntities);
        });
      },
})

export const { actions } = messagesSlice;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;