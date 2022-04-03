const getData = (url, onSuccess, onFail, errorMessage) => {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response;
      } else {
        throw new Error;
      }
    })
    .then((response) => response.json())
    .then((photos) => { onSuccess(photos); })
    .catch(() => {
      onFail(errorMessage);
    });
};

const sentData = (url, body, onSuccess, onFail) => {
  fetch(
    url,
    {
      method: 'POST',
      body: body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

// fetch(
//   'https://25.javascript.pages.academy/kekstagram',
//   {
//     method: 'POST',
//     body: formData,
//   },
// )
//   .then((response) => {
//     if (response.ok) {
//       unblockSubmitFormButton();
//       closeForm();
//       viewMessageModal(messageSuccess, 'success');
//     } else {
//       unblockSubmitFormButton();
//       closeForm();
//       viewMessageModal(messageError, 'error');
//     }
//   })
//   .catch(() => {
//     closeForm();
//     viewMessageModal(messageError, 'error');
//   })

export { getData, sentData };
