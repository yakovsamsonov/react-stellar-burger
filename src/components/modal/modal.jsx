import { createPortal } from "react-dom";
import { useEffect, createRef } from "react";
import { MODAL_ROOT } from "../constants/constants";
import ModalStyle from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import close_button from "../../icons/close_button.svg";

function Modal(props) {
  const { children, header, onClose } = props;

  const closeButton = createRef(null);

  function handleButtonClick() {
    onClose();
  }

  function handleEscapePress(evt) {
    if (evt.key === "Escape") {
      onClose();
    }
  }

  useEffect(() => {
    const closeButtonRef = closeButton.current;
    closeButtonRef.addEventListener("click", handleButtonClick);
    window.addEventListener("keydown", handleEscapePress);

    return () => {
      closeButtonRef.removeEventListener("click", handleButtonClick);
      window.removeEventListener("keydown", handleEscapePress);
    };
  }, [onClose]);

  return createPortal(
    <>
      <div className={ModalStyle.modal + " p-10"}>
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "space-between",
          }}
        >
          <img
            ref={closeButton}
            onClick={handleButtonClick}
            className="button_close"
            src={close_button}
          />
          <h2 className="text text_type_main-large">{header}</h2>
        </div>

        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    MODAL_ROOT
  );
}

export default Modal;
