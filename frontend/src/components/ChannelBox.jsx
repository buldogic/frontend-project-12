import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Nav } from 'react-bootstrap';
import Channel from './Channel.jsx';
import ChannelsHeader from './ChannelsHeader.jsx';
import { selectors as channelSelectors } from '../slices/channelsSlice.js';

const ChannelsBox = () => {
  const channelRef = useRef(null);
  const defaultChannelId = 1;

  const channels = useSelector(channelSelectors.selectAll);
  const currentChannelId = useSelector(channelSelectors.selectCurrentChannelId);

  useEffect(() => {
    if (currentChannelId !== defaultChannelId) {
      channelRef.current.scrollTo(currentChannelId, channelRef.current.scrollHeight);
    } else {
      channelRef.current.scrollTo(0, 0);
    }
  }, [channels, currentChannelId]);

  return (
    <>
      <ChannelsHeader />
      <Nav
        id="channels-box"
        as="ul"
        fill
        className="flex-column px-2 mb-3 overflow-auto h-100 d-block"
        variant="pills"
        ref={channelRef}
      >
        {channels.map((channel) => (
          <Channel key={channel.id} channel={channel} currentChannelId={currentChannelId} />
        ))}
      </Nav>
    </>
  );
};

export default ChannelsBox;
