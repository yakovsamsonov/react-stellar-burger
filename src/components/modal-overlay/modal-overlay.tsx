import ModalOverlayStyle from './modal-overlay.module.css';
import { FC } from 'react';

type TModalOveralay = {
  onClose: () => void;
};

export const ModalOverlay: FC<TModalOveralay> = ({ onClose }) => {
  return (
    <div onClick={onClose} className={ModalOverlayStyle.modal__overlay}></div>
  );
};
