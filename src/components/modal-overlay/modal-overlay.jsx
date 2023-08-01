import ModalOverlayStyle from "./modal-overlay.module.css";

function ModalOverlay(props) {
  return (
    <div
      onClick={props.onClose}
      className={ModalOverlayStyle.modal__overlay}
    ></div>
  );
}

export default ModalOverlay;
