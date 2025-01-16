import { useEffect } from 'react';
const Toast = ({ title, message, type = 'info', duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <i className='fa-solid fa-circle-check'></i>,
    info: <i className='fa-solid fa-circle-info'></i>,
    warning: <i className='fa-solid fa-triangle-exclamation'></i>,
    error: <i className='fa-solid fa-circle-exclamation'></i>
  };

  return (
    <div
      className={`toast toast--${type}`}
      style={{
        animation: `slideInLeft 0.3s ease, fadeOut 1s ${
          duration / 1000
        }s forwards`
      }}
    >
      <div className='toast__icon'>{icons[type]}</div>
      <div className='toast__body'>
        <h3 className='toast__title'>{title}</h3>
        <p className='toast__message'>{message}</p>
      </div>
      <div className='toast__close' onClick={onClose}>
        <i className='fa-solid fa-xmark'></i>
      </div>
    </div>
  );
};

export default Toast;
