function getData(onSuccess, showAlertMessage) {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    if (response.ok) {
        return response.json();
    }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => showAlertMessage(true, true));
};
  
function sendData(onSuccess, showAlertMessage, body, onFinal) {
  fetch(
    'https://26.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
  .then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
        throw new Error(`${response.status} ${response.statusText}`);
    }
    })
    .catch(() => {
      showAlertMessage(true, false);
    }).finally(() => onFinal());
};
  
export {getData, sendData};