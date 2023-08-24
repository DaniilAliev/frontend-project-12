import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState();

const channelSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        addChannels: channelsAdapter.addMany,
        addChannel: channelsAdapter.addOne,
        removeChannel: (state, { payload }) => {
            console.log(payload)
            channelsAdapter.removeOne(state, payload)
        },
        updateChannel: channelsAdapter.updateOne
    },
})

export const { actions } = channelSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelSlice.reducer;