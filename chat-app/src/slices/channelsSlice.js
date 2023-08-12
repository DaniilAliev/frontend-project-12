import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState();

export const fetchChannels = createAsyncThunk( 'channels/fetchChannels', async (token) => {
    const response = await axios.get('/api/v1/data', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
})

const channelSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChannels.fulfilled, (state, {payload}) => {
                // console.log(payload)
                channelsAdapter.addMany(state, payload.channels)
            })
            .addCase(fetchChannels.rejected, (state, { payload }) => {
                console.log('rejected')
            })
    },
})

export const { actions } = channelSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelSlice.reducer;