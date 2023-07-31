import { createPortal } from "react-dom";
import { MODAL_ROOT } from "../constants/constants";
import ModalStyle from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import close_button from "../../icons/close_button.svg";

function Modal(props) {
  const { children, header, onClose } = props;
  return createPortal(
    <>
      <div className={ModalStyle.modal + " p-10"}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <h2 className="text text_type_main-large">{header}</h2>
          <img className={ModalStyle.button_close} src={close_button} />
        </div>

        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    MODAL_ROOT
  );
}

export default Modal;
