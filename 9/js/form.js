import { uploadPhotoForm } from './upload-photo-form.js';
import { pristine } from './validate-hashtag.js';
import { sentData } from './api.js';
import { body, isEscapeKey } from './util.js';

const messageSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
const messageSuccess = messageSuccessTemplate.cloneNode(true);

const messageErrorTemplate = document.querySelector('#error').content.querySelector('.error');
const messageError = messageErrorTemplate.cloneNode(true);

const viewMessageModal = (message, classType) => {
  body.append(message);

  const buttonMessage = message.querySelector(`.${classType}__button`);

  buttonMessage.addEventListener('click', () => {
    message.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      message.remove();
    }
  });

  document.addEventListener('click', (evt) => {
    const inner = message.querySelector(`.${classType}__inner`);
    const click = evt.composedPath().includes(inner);
    if (!click) {
      message.remove();
    }
  });
};

const submitFormButton = uploadPhotoForm.querySelector('.img-upload__submit');

const blockSubmitFormButton = () => {
  submitFormButton.disabled = true;
  submitFormButton.textContent = 'Публикую';
};

const unblockSubmitFormButton = () => {
  submitFormButton.disabled = false;
  submitFormButton.textContent = 'Опубликовать';
};

// const setUserFormSubmit = (closeForm) => {
//   uploadPhotoForm.addEventListener('submit', (evt) => {
//     evt.preventDefault();

//     const isValid = pristine.validate();

//     if (isValid) {
//       const formData = new FormData(evt.target);
//       blockSubmitFormButton();

//       fetch(
//         'https://25.javascript.pages.academy/kekstagram2',
//         {
//           method: 'POST',
//           body: formData,
//         },
//       )
//         .then((response) => {
//           if (response.ok) {
//             unblockSubmitFormButton();
//             closeForm();
//             viewMessageModal(messageSuccess, 'success');
//           } else {
//             unblockSubmitFormButton();
//             closeForm();
//             viewMessageModal(messageError, 'error');
//           }
//         })
//         .catch(() => {
//           unblockSubmitFormButton();
//           closeForm();
//           viewMessageModal(messageError, 'error');
//         });

//       evt.target.reset();
//     }
//   });
// };

const setUserFormSubmit = (closeForm) => {
  uploadPhotoForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitFormButton();

      sentData(
        'https://25.javascript.pages.academy/kekstagram',
        new FormData(evt.target),
        () => {
          unblockSubmitFormButton();
          closeForm();
          viewMessageModal(messageSuccess, 'success');
        },
        () => {
          unblockSubmitFormButton();
          closeForm();
          viewMessageModal(messageError, 'error');
        }
      );

      evt.target.reset();
    }
  });
};

export { setUserFormSubmit };

