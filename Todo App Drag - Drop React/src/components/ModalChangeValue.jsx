import { useState } from 'react';

const ModalChangeValue = ({ title, inputHtml, actions, onClose }) => {
  const [inputValues, setInputValues] = useState({});
  const [isClosing, setIsClosing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleActionClick = (callback) => {
    if (callback) callback(inputValues);
    handleClose();
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };

  return (
    <div
      className={`modal-overlay ${isClosing ? 'fadeOut' : ''}`}
      onClick={handleClose}
    >
      <div
        className={`modal ${isClosing ? 'slideUp' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='modal__header'>
          <h3 className='modal__title'>{title}</h3>
          <button className='modal__close' onClick={handleClose}>
            <svg
              className='h-3 w-3'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 14 14'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
              />
            </svg>
          </button>
        </div>
        <div
          className='modal__body'
          dangerouslySetInnerHTML={{ __html: inputHtml }}
          onInput={handleInputChange}
        ></div>
        <div className='modal__footer'>
          {actions.map((action, index) => (
            <button
              key={index}
              className={`modal__btn modal__btn--${action.type || 'default'}`}
              onClick={() => handleActionClick(action.callback)}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModalChangeValue;
