import Toast from '@/components/Toast';
import { createPortal } from 'react-dom';

// const ToastContainer = ({ toasts, removeToast }) => {
//   return (
//     <div id='toast'>
//       {toasts.map((toast) => (
//         <Toast
//           key={toast.id}
//           title={toast.title}
//           message={toast.message}
//           type={toast.type}
//           duration={toast.duration}
//           onClose={() => removeToast(toast.id)}
//         />
//       ))}
//     </div>
//   );
// };

const ToastContainer = () => {
  return createPortal(<div id='toast'></div>, document.querySelector('body'));
};

export default ToastContainer;
