import ModalOverlayStyle from "./modal-overlay.module.css";

function ModalOverlay(props) {
  const { onClose } = props;
  return (
    <div onClick={onClose} className={ModalOverlayStyle.modal__overlay}></div>
  );
}

export default ModalOverlay;
