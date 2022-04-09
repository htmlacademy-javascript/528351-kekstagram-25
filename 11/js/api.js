const getData = (url, onSuccess, onError) => {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response;
      } else {
        throw new Error;
      }
    })
    .then((response) => response.json())
    .then(onSuccess)
    .catch(onError);
};

const sentData = (url, body, onSuccess, onError) => {
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
    .catch(onError);
};

export { getData, sentData };
