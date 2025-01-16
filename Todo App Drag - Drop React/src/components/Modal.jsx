import { createPortal } from 'react-dom';

const Modal = () => {
  return createPortal(
    <div id='modal-container'>Modal</div>,
    document.querySelector('body')
  );
};
export default Modal;
