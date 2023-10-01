import { createPortal } from 'react-dom';
import { useEffect, createRef } from 'react';
import { MODAL_ROOT } from '../../utils/constants';
import ModalStyle from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import close_button from '../../icons/close_button.svg';

function Modal(props) {
  const { children, header, onClose } = props;

  const closeButton = createRef(null);

  function handleButtonClick() {
    onClose();
  }

  function handleEscapePress(evt) {
    if (evt.key === 'Escape') {
      onClose();
    }
  }

  useEffect(() => {
    const closeButtonRef = closeButton.current;
    closeButtonRef.addEventListener('click', handleButtonClick);
    window.addEventListener('keydown', handleEscapePress);

    return () => {
      closeButtonRef.removeEventListener('click', handleButtonClick);
      window.removeEventListener('keydown', handleEscapePress);
    };
  }, [onClose]);

  return createPortal(
    <>
      <div className={ModalStyle.modal}>
        <div className={ModalStyle['modal__header-box']}>
          <img
            ref={closeButton}
            className={ModalStyle['modal__close-button']}
            onClick={handleButtonClick}
            src={close_button}
          />
          <h2 className={ModalStyle['modal__header-label']}>{header}</h2>
        </div>
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    MODAL_ROOT
  );
}

export default Modal;
