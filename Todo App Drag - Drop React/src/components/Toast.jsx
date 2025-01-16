import { createPortal } from 'react-dom';

const Toast = () => {
  return createPortal(<div id='toast'></div>, document.querySelector('body'));
};
export default Toast;
