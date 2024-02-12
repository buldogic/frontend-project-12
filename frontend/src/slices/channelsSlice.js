/* eslint-disable no-param-reassign */

import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const defaultChannelId = 1;
const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  currentChannelId: defaultChannelId,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    renameChannel: channelsAdapter.updateOne,
    removeChannel: (state, { payload }) => {
      if (state.currentChannelId === payload) {
        state.currentChannelId = defaultChannelId;
      }
      channelsAdapter.removeOne(state, payload);
    },
    changeChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
  },
});

export const { actions } = channelsSlice;
const selectors = channelsAdapter.getSelectors((state) => state.channels);
const customSelectors = {
  selectAll: selectors.selectAll,
  selectById: selectors.selectById,
  selectCurrentChannelId: (state) => state.channels.currentChannelId,
  selectCurrentChannel: (state) => {
    const { currentChannelId } = state.channels;
    return selectors.selectById(state, currentChannelId);
  },
};

export { customSelectors as selectors };
export default channelsSlice.reducer;
