import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channelsSlice.js';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
  },
  extraReducers: (builder) => {
    builder.addCase(channelsActions.removeChannel, (state, { payload }) => {
      const channel = payload;
      const channelMessages = Object
        .values(state.entities)
        .filter((e) => channel.id === e.channelId)
        .map((message) => message.id);
      messagesAdapter.removeMany(state, channelMessages);
    });
  },
});

export const { actions } = messagesSlice;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;
