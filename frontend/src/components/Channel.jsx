import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Nav,
  ButtonGroup,
  Button,
  Dropdown,
} from 'react-bootstrap';
import { actions as channelActions } from '../slices/channelsSlice.js';
import { actions as modalsActions } from '../slices/modalsSlice.js';

const Channel = ({ channel, currentChannelId }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleSelectChannel = () => {
    dispatch(channelActions.changeChannel(channel.id));
  };

  const handleRemoveChannel = () => {
    dispatch(modalsActions.open({ type: 'remove', targetId: channel.id }));
  };

  const handleRenameChannel = () => {
    dispatch(modalsActions.open({ type: 'rename', targetId: channel.id }));
  };

  const ModalMenu = (
    <>
      <Dropdown.Toggle
        split
        variant={channel.id === currentChannelId && 'secondary'}
        id="dropdown-split-secondary"
        className="flex-grow-0"
      >
        <span className="visually-hidden">{t('channels.channelManagement')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={handleRemoveChannel}>{t('channels.removeToggle')}</Dropdown.Item>
        <Dropdown.Item onClick={handleRenameChannel}>{t('channels.renameToggle')}</Dropdown.Item>
      </Dropdown.Menu>
    </>
  );

  return (
    <Nav.Item as="li" className="w-100">
      <Dropdown as={ButtonGroup} className="d-flex">
        <Button onClick={handleSelectChannel} className="w-100 rounded-0 text-start text-truncate" variant={channel.id === currentChannelId && 'secondary'}>
          <span># </span>
          {channel.name}
        </Button>
        {channel.removable ? ModalMenu : null}
      </Dropdown>
    </Nav.Item>
  );
};

export default Channel;
