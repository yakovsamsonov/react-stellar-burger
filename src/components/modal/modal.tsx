import { createPortal } from 'react-dom';
import { FC, useEffect, createRef, useCallback } from 'react';
import { MODAL_ROOT } from '../../utils/constants';
import ModalStyle from './modal.module.css';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import close_button from '../../icons/close_button.svg';

type TModal = {
  onClose: () => void;
};

export const Modal: FC<TModal> = ({ children, onClose }) => {
  const closeButton = createRef<HTMLImageElement>();

  const handleButtonClick = useCallback((): void => {
    onClose();
  }, [onClose]);

  const handleEscapePress = useCallback(
    (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    const closeButtonRef = closeButton.current;
    if (closeButtonRef) {
      closeButtonRef.addEventListener('click', handleButtonClick);
    }
    window.addEventListener('keydown', handleEscapePress);

    return () => {
      if (closeButtonRef) {
        closeButtonRef.removeEventListener('click', handleButtonClick);
      }
      window.removeEventListener('keydown', handleEscapePress);
    };
  }, [closeButton, handleEscapePress, handleButtonClick]);

  return createPortal(
    <>
      <div className={ModalStyle.modal}>
        <>
          <img
            ref={closeButton}
            className={ModalStyle['modal__close-button']}
            onClick={handleButtonClick}
            src={close_button}
            alt="X"
          ></img>
          {children}
        </>
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    MODAL_ROOT as HTMLElement
  );
};
