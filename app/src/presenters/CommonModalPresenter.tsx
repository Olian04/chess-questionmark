import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { CommonModal } from '../components/common/CommonModal';
import { modalState, openModal } from '../state/modal';

export const CommonModalPresenter = () => {
  const setModal = useSetRecoilState(modalState);
  const modal = useRecoilValue(openModal);

  const handleClose = () => {
    setModal({ ...modal, open: false });
  };

  return <CommonModal handleClose={handleClose} modal={modal} />;
};
