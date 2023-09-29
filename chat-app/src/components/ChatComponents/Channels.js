import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Channel from './Channel';
import { selectors } from '../../slices/channelSelectors';
import Modal from '../Modals/getModal';
import SvgButton from './SvgButton';
import { modalActions } from '../../slices';

const Channels = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const channels = useSelector(selectors.selectAll);

  const handleAddChannelButton = () => {
    dispatch(modalActions.openModal({ type: 'adding', channel: null }));
  };

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('chatPage.channels')}</b>
        <button onClick={handleAddChannelButton} type="button" className="p-0 text-primary btn btn-group-vertical">
          <SvgButton />
          <span className="visually-hidden">+</span>
        </button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels
          .map((channel) => <Channel channel={channel} key={channel.id} />)}
      </ul>
      <Modal />
    </div>
  );
};

export default Channels;
