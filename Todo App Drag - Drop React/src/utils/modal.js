export function modalChangeValue({ title = '', inputHtml = '', actions = [] }) {
  const main = document.getElementById('modal-container');
  if (main) {
    const modalOverlay = document.createElement('div');
    modalOverlay.classList.add('modal-overlay');

    modalOverlay.innerHTML = `
      <div class="modal">
        <div class="modal__header">
          <h3 class="modal__title">${title}</h3>
          <button class="modal__close">
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
        <div class="modal__body">
          ${inputHtml}
        </div>
        <div class="modal__footer">
          ${actions
            .map(
              (action, index) =>
                `<button class="modal__btn modal__btn--${
                  action.type || 'default'
                }" data-action-index="${index}">
                  ${action.label}
                </button>`
            )
            .join('')}
        </div>
      </div>
    `;

    main.appendChild(modalOverlay);

    function closeModal() {
      modalOverlay.style.animation = 'fadeOut 0.3s ease forwards';
      modalOverlay.querySelector('.modal').style.animation =
        'slideUp 0.3s ease forwards';
      setTimeout(() => {
        main?.removeChild(modalOverlay);
      }, 300);
    }

    modalOverlay.addEventListener('click', (e) => {
      if (e.target.closest('.modal__close') || e.target === modalOverlay) {
        closeModal();
      }
    });

    modalOverlay.querySelectorAll('.modal__btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const actionIndex = e.target.dataset.actionIndex;
        const action = actions[actionIndex];

        const inputs = modalOverlay.querySelectorAll('input, textarea, select');
        const inputValues = {};
        inputs.forEach((input) => {
          inputValues[input.name] = input.value;
        });

        if (action && action.callback) {
          action.callback(inputValues);
        }
        closeModal();
      });
    });
  } else {
    console.error(
      'Modal container element with ID "modal-container" not found.'
    );
  }
}
