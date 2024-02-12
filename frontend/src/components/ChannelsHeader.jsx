import React from 'react';
import { PlusSquare } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { actions as modalsActions } from '../slices/modalsSlice.js';

const ChannelsHeader = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleAddChannel = () => {
    dispatch(modalsActions.open({ type: 'add', targetId: null }));
  };

  return (
    <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
      <b>{t('channels.channelsHeader')}</b>
      <button type="button" onClick={handleAddChannel} className="p-0 text-primary btn btn-group-vertical">
        <PlusSquare size={20} />
        <span className="visually-hidden">+</span>
      </button>
    </div>
  );
};

export default ChannelsHeader;
