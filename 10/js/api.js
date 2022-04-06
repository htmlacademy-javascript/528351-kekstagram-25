const getData = (url, onSuccess, onFail) => {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response;
      } else {
        throw new Error;
      }
    })
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(() => {
      onFail();
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
        throw new Error;
      }
    })
    .catch(() => {
      onFail();
    });
};

export { getData, sentData };
